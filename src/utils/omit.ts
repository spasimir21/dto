function omit<T, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K> {
  const newObject: any = {};

  for (const key in object) {
    if (keys.includes(key as any)) continue;
    newObject[key] = (object as any)[key];
  }

  return newObject;
}

export { omit };
