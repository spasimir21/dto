function pick<T, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> {
  const newObject: any = {};

  for (const key of keys) newObject[key] = (object as any)[key];

  return newObject;
}

export { pick };
