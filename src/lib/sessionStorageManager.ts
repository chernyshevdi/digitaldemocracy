export const getItem = (item: string) => sessionStorage.getItem(item);

export const setItem = (item: string, value: any) => {
  if (typeof value !== 'string') {
    sessionStorage.setItem(item, JSON.stringify(value));
  } else {
    sessionStorage.setItem(item, value);
  }
};

export const removeItem = (item: string) => sessionStorage.removeItem(item);
