const stringify = (value: any) => {
  if (value != null && typeof value === 'object') {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== Array.prototype && prototype != null) return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

export { stringify };
