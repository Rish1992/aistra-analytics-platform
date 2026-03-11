import os
from bson import ObjectId
from pymongo import MongoClient

_client = None
_db = None


def get_db():
    global _client, _db
    if _db is None:
        uri = os.environ["DEEPTALK_MONGODB_URI"]
        _client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        _client.admin.command("ping")  # fail fast
        _db = _client["deeptalk"]
    return _db


def serialize_doc(doc):
    """Recursively convert ObjectId to string in a document."""
    if isinstance(doc, dict):
        return {k: serialize_doc(v) for k, v in doc.items()}
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    if isinstance(doc, ObjectId):
        return str(doc)
    return doc
