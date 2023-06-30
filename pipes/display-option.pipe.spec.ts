import {DisplayOptionPipe} from './display-option.pipe';

describe('DisplayOptionPipe', () => {
  it('create an instance', () => {
    const pipe = new DisplayOptionPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('DisplayOptionPipe', () => {
  const pipe = new DisplayOptionPipe();

  it('transforms just a string ', () => {
    const option = 'expectedValue';
    expect(pipe.transform(option)).toEqual('expectedValue');
  });

  it('transforms a simple object', () => {
    const option = { value: 'expectedValue' };
    expect(pipe.transform(option, ['value'])).toEqual('expectedValue');
  });

  it('transforms a complex object', () => {
    const option = { toto: { tata : { value: 'expectedValue' } } };
    expect(pipe.transform(option, ['toto.tata.value'])).toEqual('expectedValue');
  });

  it('transforms a complex object without corresponding property', () => {
    const option = { toto: { tata : { value: 'unexpectedValue' } } };
    expect(pipe.transform(option, ['toto.titi.value'])).toEqual('');
  });

  it('transforms a complex object with last property matching', () => {
    const option = { toto: { tata : { value: 'unexpectedValue' } }, tutu: 'expectedValue' };
    expect(pipe.transform(option, ['toto.titi.value', 'tutu'])).toEqual('expectedValue');
  });
});
