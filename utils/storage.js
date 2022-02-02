export const sessionStore = (key, initialValue) => ({
  connect: () => {
    if (sessionStorage.getItem(key) === null) {
      sessionStorage.setItem(key, JSON.stringify(initialValue));
    }
  },
  get: () => JSON.parse(sessionStorage.getItem(key)),
  set: (host, value) => {
    if (value === undefined) {
      const initValue = JSON.parse(sessionStorage.getItem(key));
      return initValue;
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
      return value;
    }
  },
});
