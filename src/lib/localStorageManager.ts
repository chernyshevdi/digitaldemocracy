export const getItem = (item: string) => {
  if (item === 'token') {
    if (localStorage.getItem(item)) {
      return localStorage.getItem(item);
    }
    return sessionStorage.getItem(item);
  }
  return localStorage.getItem(item);
};

export const setItem = (item: string, value: any, rememberMe?: string) => {
  if (typeof value !== 'string') {
    localStorage.setItem(item, JSON.stringify(value));
  }

  if (item === 'token' && rememberMe === 'false') {
    sessionStorage.setItem(item, value);
  } else {
    localStorage.setItem(item, value);
  }
};

export const removeItem = (item: string) => {
  sessionStorage.removeItem(item);
  localStorage.removeItem(item);
};
