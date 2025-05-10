const mapObject = <T, V>(object: T, map: (key: keyof T, value: T[keyof T], object: T) => V): Record<keyof T, V> => {
  const newObject: any = {};
  for (const key in object) newObject[key] = map(key, object[key], object);
  return newObject;
};

export { mapObject };
