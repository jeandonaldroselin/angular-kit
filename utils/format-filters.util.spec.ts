import {formatFilters} from './format-filters.util';

describe('Test format filters util', () => {
  it('Should return an empty string when the object is undefined', () => {
    // Give
    const input = undefined;
    // When
    const result = formatFilters(input)
    // Then
    expect(result).toEqual('');
  });

  it('Should return an empty string when the object is empty', () => {
    // Give
    const input = {};
    // When
    const result = formatFilters(input)
    // Then
    expect(result).toEqual('');
  });

  it('Should return a string with one parameter ', () => {
    // Give
    const input = {myParameter: 'myValue'};
    // When
    const result = formatFilters(input)
    // Then
    expect(result).toEqual('myParameter=myValue');
  });

  it('Should return a string with two parameters ', () => {
    // Give
    const input = {myParameter: 'myValue', myParameter2: 'myValue2'};
    // When
    const result = formatFilters(input)
    // Then
    expect(result).toEqual('myParameter=myValue&myParameter2=myValue2');
  });

  it('Should return a string without filter filtered  ', () => {
    // Give
    const input = {myParameter: 'myValue', sort: 1, page: 2, size: 10};
    // When
    const result = formatFilters(input, ['sort', 'page', 'size']);
    // Then
    expect(result).toEqual('myParameter=myValue');
  });
})
