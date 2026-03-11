from fastapi import APIRouter, HTTPException
from db import get_db, serialize_doc

router = APIRouter()


@router.get("/api/analytics/overview")
def overview():
    db = get_db()

    # Total counts
    total_contacts = db.contacts.count_documents({})
    total_bots = db.bots.count_documents({})
    total_deployments = db.deployments.count_documents({})

    # Avg session length
    avg_result = list(db.contacts.aggregate([
        {"$group": {"_id": None, "avg": {"$avg": "$session_length"}}}
    ]))
    avg_session_length = round(avg_result[0]["avg"], 1) if avg_result else 0

    # Contacts per month — start_time is ISO string, use $substr to extract YYYY-MM
    contacts_per_month = list(db.contacts.aggregate([
        {"$addFields": {"month": {"$substr": ["$start_time", 0, 7]}}},
        {"$group": {"_id": "$month", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}},
        {"$project": {"month": "$_id", "count": 1, "_id": 0}},
    ]))

    # Top 10 bots by contact volume
    top_bots_by_volume = list(db.contacts.aggregate([
        {"$group": {"_id": "$bot_name", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10},
        {"$project": {"bot_name": "$_id", "count": 1, "_id": 0}},
    ]))

    # Top 10 bots by avg session length
    top_bots_by_session = list(db.contacts.aggregate([
        {"$group": {"_id": "$bot_name", "avg_session": {"$avg": "$session_length"}}},
        {"$sort": {"avg_session": -1}},
        {"$limit": 10},
        {"$project": {"bot_name": "$_id", "avg_session": {"$round": ["$avg_session", 1]}, "_id": 0}},
    ]))

    # Deployment type breakdown
    deployment_types = list(db.deployments.aggregate([
        {"$group": {"_id": "$type", "count": {"$sum": 1}}},
        {"$project": {"type": "$_id", "count": 1, "_id": 0}},
    ]))

    # TTS providers
    tts_providers = list(db.deployments.aggregate([
        {"$group": {"_id": "$tts_provider", "count": {"$sum": 1}}},
        {"$project": {"provider": "$_id", "count": 1, "_id": 0}},
    ]))

    # STT providers
    stt_providers = list(db.deployments.aggregate([
        {"$group": {"_id": "$stt_provider", "count": {"$sum": 1}}},
        {"$project": {"provider": "$_id", "count": 1, "_id": 0}},
    ]))

    return {
        "total_contacts": total_contacts,
        "total_bots": total_bots,
        "total_deployments": total_deployments,
        "avg_session_length": avg_session_length,
        "contacts_per_month": contacts_per_month,
        "top_bots_by_volume": top_bots_by_volume,
        "top_bots_by_session": top_bots_by_session,
        "deployment_types": deployment_types,
        "tts_providers": tts_providers,
        "stt_providers": stt_providers,
    }


@router.get("/api/analytics/bots")
def bots():
    db = get_db()

    # Get contact stats grouped by bot_id (string)
    contact_stats = {
        doc["_id"]: doc
        for doc in db.contacts.aggregate([
            {"$group": {
                "_id": "$bot_id",
                "contact_count": {"$sum": 1},
                "avg_session_length": {"$avg": "$session_length"},
            }},
        ])
    }

    # Get all bots
    results = []
    for bot in db.bots.find({}, {"name": 1, "llm": 1, "last_edited": 1}):
        bot_id_str = str(bot["_id"])
        stats = contact_stats.get(bot_id_str, {})
        results.append({
            "id": bot_id_str,
            "name": bot.get("name", ""),
            "llm": bot.get("llm") or "unknown",
            "last_edited": bot.get("last_edited"),
            "contact_count": stats.get("contact_count", 0),
            "avg_session_length": round(stats.get("avg_session_length", 0) or 0, 1),
        })

    results.sort(key=lambda x: x["contact_count"], reverse=True)
    return {"bots": results}


@router.get("/api/collections")
def list_collections():
    db = get_db()
    collections = []
    for name in sorted(db.list_collection_names()):
        count = db[name].estimated_document_count()
        collections.append({"name": name, "count": count})
    return {"collections": collections}


@router.get("/api/collections/{name}")
def collection_detail(name: str):
    db = get_db()
    if name not in db.list_collection_names():
        raise HTTPException(404, f"Collection '{name}' not found")

    # Sample 20 docs
    sample = [serialize_doc(doc) for doc in db[name].find().limit(20)]

    # Infer schema from sample
    field_info = {}
    for doc in sample:
        for key, val in doc.items():
            if key not in field_info:
                field_info[key] = {"type": set(), "values": set()}
            field_info[key]["type"].add(type(val).__name__)
            # Track values for low-cardinality fields (skip large/complex)
            if isinstance(val, (str, int, float, bool)) and val is not None:
                if len(field_info[key]["values"]) < 20:
                    field_info[key]["values"].add(val)

    schema = []
    for field, info in field_info.items():
        types = sorted(info["type"])
        values = sorted(info["values"], key=str) if len(info["values"]) <= 10 else None
        schema.append({
            "field": field,
            "types": types,
            "sample_values": values,
        })

    return {"sample": sample, "schema": schema}
