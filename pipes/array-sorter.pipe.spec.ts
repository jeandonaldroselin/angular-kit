import {ArraySorterPipe} from './array-sorter.pipe';

describe('ArraySorterPipe', () => {
  it('create an instance', () => {
    const pipe = new ArraySorterPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('ArraySorterPipe transform method', () => {
  const pipe = new ArraySorterPipe();
  const initialObjectArray = [{label: 'b'}, {label: 'a'}, {label: 'c'}];
  const objectArraySorteredAsc = [{label: 'a'}, {label: 'b'}, {label: 'c'}];
  const objectArraySorteredDesc = [{label: 'c'}, {label: 'b'}, {label: 'a'}];
  const initialStringArray = ['b', 'a', 'c'];
  const stringArraySorteredAsc = ['a', 'b', 'c'];
  const stringArraySorteredDesc = ['c', 'b', 'a'];

  it(`transforms initialObjectArray to objectArraySorteredAsc when object list is provided`, () => {
    // Given
    const key = 'label';
    const direction = 'asc';
    // When
    const result = pipe.transform(initialObjectArray, key, direction);
    // Then
    expect(result).toEqual(objectArraySorteredAsc);
  });

  it(`transforms initialObjectArray to objectArraySorteredDesc when object list is provided`, () => {
    // Given
    const key = 'label';
    const direction = 'desc';
    // When
    const result = pipe.transform(initialObjectArray, key, direction);
    // Then
    expect(result).toEqual(objectArraySorteredDesc);
  });

  it(`transforms initialStringArray to stringArraySorteredAsc when string list is provided`, () => {
    // Given
    const key = null;
    const direction = 'asc';
    // When
    const result = pipe.transform(initialStringArray, key, direction);
    // Then
    expect(result).toEqual(stringArraySorteredAsc);
  });

  it(`transforms initialStringArray to stringArraySorteredDesc when string list is provided`, () => {
    // Given
    const key = null;
    const direction = 'desc';
    // When
    const result = pipe.transform(initialStringArray, key, direction);
    // Then
    expect(result).toEqual(stringArraySorteredDesc);
  });
});

describe('ArraySorterPipe sortByDirection', () => {
  const pipe = new ArraySorterPipe();
  const initialObjectArray = [{label: 'b'}, {label: 'a'}, {label: 'c'}];
  const objectArraySorteredAsc = [{label: 'a'}, {label: 'b'}, {label: 'c'}];
  const objectArraySorteredDesc = [{label: 'c'}, {label: 'b'}, {label: 'a'}];
  const initialStringArray = ['b', 'a', 'c'];
  const stringArraySorteredAsc = ['a', 'b', 'c'];
  const stringArraySorteredDesc = ['c', 'b', 'a'];

  it('should sort ascending properly an array of object using sortByDirection with direction asc', (() => {
    // Given
    const key = 'label';
    const direction = 'asc';
    // When
    const sortingFunction = pipe.sortByDirection(key, direction);
    const result = initialObjectArray.sort(sortingFunction)
    // Then
    expect(result).toEqual(objectArraySorteredAsc);
  }));

  it('should sort ascending properly an array of object using sortByDirection with direction desc', (() => {
    // Given
    const key = 'label';
    const direction = 'desc';
    // When
    const sortingFunction = pipe.sortByDirection(key, direction);
    const result = initialObjectArray.sort(sortingFunction)
    // Then
    expect(result).toEqual(objectArraySorteredDesc);
  }));

  it('should sort ascending properly an array of string using sortByDirection with direction asc', (() => {
    // Given
    const key = null;
    const direction = 'asc';
    // When
    const sortingFunction = pipe.sortByDirection(key, direction);
    const result = initialStringArray.sort(sortingFunction)
    // Then
    expect(result).toEqual(stringArraySorteredAsc);
  }));

  it('should sort ascending properly an array of string using sortByDirection with direction desc', (() => {
    // Given
    const key = null;
    const direction = 'desc';
    // When
    const sortingFunction = pipe.sortByDirection(key, direction);
    const result = initialStringArray.sort(sortingFunction)
    // Then
    expect(result).toEqual(stringArraySorteredDesc);
  }));
});

describe('ArraySorterPipe getValueDepth', () => {
  const pipe = new ArraySorterPipe();

  it('should return a string if provided a string to the getValueDepth function', (() => {
    // Given
    const object = 'label';
    // When
    const result = pipe.getValueDepth(object, null);
    // Then
    const output = 'label';
    expect(result).toEqual(output);
  }));

  it('should return a string if provided an object with one level of deepness to the getValueDepth function', (() => {
    // Given
    const object = { label : 'label' };
    // When
    const result = pipe.getValueDepth(object, 'label');
    // Then
    const output = 'label';
    expect(result).toEqual(output);
  }));

  it('should return a string if provided an object with two levels of deepness to the getValueDepth function', (() => {
    // Given
    const object = { entity : { label: 'label' } };
    // When
    const result = pipe.getValueDepth(object, 'entity.label');
    // Then
    const output = 'label';
    expect(result).toEqual(output);
  }));

  it('should return an empty string if provided an object with not found attribute to the getValueDepth function', (() => {
    // Given
    const object = { label : 'label' };
    // When
    const result = pipe.getValueDepth(object, 'myLabel');
    // Then
    const output = '';
    expect(result).toEqual(output);
  }));
});
