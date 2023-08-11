export function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function saveToLocalStorage(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}
