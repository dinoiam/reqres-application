/**
 * Returns the a new array with the new Object.
 * If the Object is already present, it will be added at the same position.
 * If the Object is not already present, it will be added at the end of the array.
 *
 * @param arrayOfObjects - The array of Object where to add the new Object
 * @param newObject - The new Object to add
 * @param key - The key on which perform the equality between the Objects inside the array and the new Object
 * @returns A new array with the new Object
 *
 */
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

/**
 * Returns the a new array merged with the new array of Objects.
 * For each Object, If the Object is already present, it will be added at the same position.
 * If the Object is not already present, it will be added at the end of the array.
 *
 * @param arrayOfObjects - The array of Objects where to add the new Object
 * @param newObjects - The new array of Objects to add
 * @param key - The key on which perform the equality between the Objects inside the array and the new Object
 * @returns A new array with the new Object
 *
 */
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

/**
 * Returns the a new array filtered by the keys.
 *
 * @param arrayOfObjects - The array of Objects to filter
 * @param filter - The filter
 * @param keys - The array of keys used to filter the Objects
 * @returns A new array with the new Object
 *
 */
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
