export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = {} as T;
  Object.keys(obj).forEach(key => {
    if (keys.indexOf(key as K) === -1) {
      result[key as K] = obj[key as K];
    }
  });
  return result;
};
