import {ArrayFilterPipe} from './array-filter.pipe';

describe('ArrayFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayFilterPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('ArrayFilterPipe transforms', () => {
  const pipe = new ArrayFilterPipe();
  const initialArray = [{label: 'a'}, {label: 'b'}, {label: 'c'}];
  const arrayFilteredOnA = [{label: 'a'}];
  const arrayFilteredWithoutResults = [];

  it(`transforms initialArray to equal arrayFilteredOnA `, () => {
    // Given
    const key = 'label';
    const value = 'a';
    // When
    const result = pipe.transform(initialArray, key, value);
    // Then
    expect(result).toEqual(arrayFilteredOnA);
  });

  it(`transforms initialArray to equal arrayFilteredWithoutResults `, () => {
    // Given
    const key = 'label';
    const value = 'q';
    // When
    const result = pipe.transform(initialArray, key, value);
    // Then
    expect(result).toEqual(arrayFilteredWithoutResults);
  });
});
