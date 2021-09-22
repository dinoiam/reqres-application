import {
  addOrReplaceObjectByKey,
  addOrReplaceArrayOfObjectByKey,
  filterArrayOfObjectsBy
} from '../array';

describe('addOrReplaceObjectByKey', () => {
  describe('if the new object is not already inside the array', () => {
    test('it should return the new object plus everyone else', () => {
      const mockArray = [
        { id: 1, val: 1 },
        { id: 2, val: 2 },
        { id: 3, val: 3 }
      ];
      const mockNewObject = { id: 4, val: 4 };
      expect(addOrReplaceObjectByKey(mockArray, mockNewObject, 'id')).toEqual([
        ...mockArray,
        mockNewObject
      ]);
    });
  });

  describe('if the new object is already inside the array', () => {
    test('it should return the new object instead of the old one', () => {
      const mockArray = [
        { id: 1, val: 1 },
        { id: 2, val: 2 },
        { id: 3, val: 3 }
      ];
      const mockNewObject = { id: 1, val: 4 };
      expect(addOrReplaceObjectByKey(mockArray, mockNewObject, 'id')).toEqual([
        mockNewObject,
        { id: 2, val: 2 },
        { id: 3, val: 3 }
      ]);
    });
  });
});

describe('addOrReplaceArrayOfObjectByKey', () => {
  describe('if the new objects are not already inside the array', () => {
    test('it should return the new objects plus everyone else', () => {
      const mockArray = [
        { id: 1, val: 1 },
        { id: 2, val: 2 },
        { id: 3, val: 3 }
      ];
      const mockNewObjects = [
        { id: 4, val: 4 },
        { id: 5, val: 5 }
      ];
      expect(addOrReplaceArrayOfObjectByKey(mockArray, mockNewObjects, 'id')).toEqual([
        ...mockArray,
        ...mockNewObjects
      ]);
    });
  });

  describe('if the new object are already inside the array', () => {
    test('it should return the new objects instead of the old ones', () => {
      const mockArray = [
        { id: 1, val: 1 },
        { id: 2, val: 2 },
        { id: 3, val: 3 }
      ];
      const mockNewObjects = [
        { id: 1, val: 4 },
        { id: 2, val: 4 },
        { id: 3, val: 4 }
      ];
      expect(addOrReplaceArrayOfObjectByKey(mockArray, mockNewObjects, 'id')).toEqual([
        ...mockNewObjects
      ]);
    });
  });
});

describe('filterArrayOfObjectsBy', () => {
  test('it should filter the array base on the filter param', () => {
    const mockArray = [
      { id: 1, val: 'hi', name: 'mario' },
      { id: 2, val: 'jack', name: 'hello' },
      { id: 3, val: 'test_val_3', name: 'test_name_3' },
      { id: 4, val: 'val_3', name: 'mario' },
      { id: 5, val: 'mario', name: 'hello' }
    ];
    expect(filterArrayOfObjectsBy(mockArray, 'val_3', ['val'])).toEqual([
      { id: 3, val: 'test_val_3', name: 'test_name_3' },
      { id: 4, val: 'val_3', name: 'mario' }
    ]);
    expect(filterArrayOfObjectsBy(mockArray, 'mario', ['val', 'name'])).toEqual([
      { id: 1, val: 'hi', name: 'mario' },
      { id: 4, val: 'val_3', name: 'mario' },
      { id: 5, val: 'mario', name: 'hello' }
    ]);
    expect(filterArrayOfObjectsBy(mockArray, 'mario', ['val', 'name'])).toEqual([
      { id: 1, val: 'hi', name: 'mario' },
      { id: 4, val: 'val_3', name: 'mario' },
      { id: 5, val: 'mario', name: 'hello' }
    ]);
    expect(filterArrayOfObjectsBy(mockArray, 'mario', ['val'])).toEqual([
      { id: 5, val: 'mario', name: 'hello' }
    ]);
  });
});
