export const getClientLocalStorage = (key: string) => localStorage.getItem(key);
export const setClientLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);
export const removeClientLocalStorage = (key: string) =>
  localStorage.removeItem(key);
