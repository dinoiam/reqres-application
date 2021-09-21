export function addOrReplaceObjectByKey<T extends { [x: string]: unknown }>(
  arrayOfObjects: T[],
  newObject: T,
  key: keyof T
): T[] {
  const index = arrayOfObjects.findIndex((object) => object[key] === newObject[key]);
  if (index === -1) {
    return [...arrayOfObjects, newObject];
  } else {
    arrayOfObjects[index] = { ...arrayOfObjects[index], ...newObject };
    return arrayOfObjects;
  }
}

export function addOrReplaceArrayOfObjectByKey<T extends { [x: string]: unknown }>(
  arrayOfObjects: T[],
  newObjects: T[],
  key: keyof T
): T[] {
  let result = arrayOfObjects;
  newObjects.map((object) => {
    result = addOrReplaceObjectByKey(result, object, key);
  });
  return result;
}

export function filterArrayOfObjectsBy<T extends { [x: string]: unknown }>(
  arrayOfObjects: Array<T>,
  filter: string,
  keys: Array<keyof T>
): Array<T> {
  return arrayOfObjects.filter((object) =>
    keys.find((key) => {
      const value = object[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(filter.toLowerCase());
      }
    })
  );
}
