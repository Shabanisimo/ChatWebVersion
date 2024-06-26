export async function getItemFromStorage(key) {
  return await localStorage.getItem(key);
}

export async function setItemToStorage(key, token) {
  await localStorage.setItem(key, token);
}

export async function removeItemFromStorage(key) {
  await localStorage.removeItem(key);
}

export async function removeAllItems() {
  await localStorage.clear();
}
