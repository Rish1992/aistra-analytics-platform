const DASHBOARD_API = '/api/dashboard';
const TALK_TO_DB_API = '/api/talk-to-db';

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return { error: `HTTP ${res.status}: ${res.statusText}` };
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

export async function getOverview() {
  return fetchJSON(`${DASHBOARD_API}/api/analytics/overview`);
}

export async function getBots() {
  return fetchJSON(`${DASHBOARD_API}/api/analytics/bots`);
}

export async function getCollections() {
  return fetchJSON(`${DASHBOARD_API}/api/collections`);
}

export async function getCollectionData(name) {
  return fetchJSON(`${DASHBOARD_API}/api/collections/${encodeURIComponent(name)}`);
}

export function queryDatabase(question, connectionString, dbType, collection) {
  const controller = new AbortController();
  const promise = fetch(`${TALK_TO_DB_API}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, connection_string: connectionString, db_type: dbType, collection }),
    signal: controller.signal,
  });
  return { promise, abort: () => controller.abort() };
}
