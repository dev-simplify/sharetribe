export const LocalStorageHelper = {
  setItem(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  getItem(key, isJson = false) {
    const value = localStorage.getItem(key);
    if (value && isJson) {
      return JSON.parse(value);
    } else {
      return value;
    }
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
