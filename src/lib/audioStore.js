// Saved speaking recordings live in IndexedDB (too large for localStorage),
// keyed by the saved answer's id.
const DB = 'celpip_audio';
const STORE = 'recordings';

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function run(mode, fn) {
  return open().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const req = fn(tx.objectStore(STORE));
    tx.oncomplete = () => resolve(req && req.result);
    tx.onerror = () => reject(tx.error);
  }));
}

export const putAudio = (id, blob) => run('readwrite', (s) => s.put(blob, id));
export const getAudio = (id) => run('readonly', (s) => s.get(id));
export const deleteAudio = (id) => run('readwrite', (s) => s.delete(id));
