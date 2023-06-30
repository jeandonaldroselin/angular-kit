import {cleanObject, cleanSpaceString} from './object.util';

describe('Test object util cleanSpaceString function', () => {
  it('Should clean space string with undefined', () => {
    // Give
    // When
    const result = cleanSpaceString(undefined)
    // Then
    expect(result).toBeUndefined();
  });

  it('Should clean space string with object', () => {
    // Give
    const objectTest = {};
    // When
    const result = cleanSpaceString(objectTest)
    // Then
    expect(result).toEqual(objectTest);
  });

  it('Should clean space string with array', () => {
    // Give
    const arrayTest = ['    '];
    // When
    const result = cleanSpaceString(arrayTest)
    // Then
    expect(result).toEqual(arrayTest);
  });

  it('Should clean space string with object contain with multi type', () => {
    // Give
    const test = {
      numberType: 123456789,
      arrayType: [1, '  a   ', {}],
      stringType: '    test    ',
    }
    // When
    const result = cleanSpaceString(test)
    // Then
    expect(result.numberType).toEqual(result.numberType);
    expect(result.arrayType).toEqual(result.arrayType);
    expect(result.stringType).toEqual('test');
  });

  it('Should clean space string with object contain string type', () => {
    // Give
    const test = {
      fullWhiteSpaces: '    ',
      beginWhiteSpaces: '    begin',
      endWhiteSpaces: 'end    ',
    }
    // When
    const result = cleanSpaceString(test)
    // Then
    expect(result.fullWhiteSpaces).toEqual('');
    expect(result.beginWhiteSpaces).toEqual('begin');
    expect(result.endWhiteSpaces).toEqual('end');
  });
})

describe('Test object util cleanObject function', () => {
  it('Should remove attribute with null and undefined content', () => {
    // Give
    const expected = {
      text2: 'text2',
      text3: ''
    };
    // When
    const result = cleanObject({
      text1: null,
      text2: 'text2',
      text3: '',
      text4: undefined
    })
    // Then
    expect(result).toEqual(expected);
  });

});
