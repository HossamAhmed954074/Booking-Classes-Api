const MapStore = new Map();

function getIdempotency(key) {
  return MapStore.get(key);
}
function setIdempotency(key, value) {
  MapStore.set(key, value);
}
module.exports = { getIdempotency, setIdempotency };
