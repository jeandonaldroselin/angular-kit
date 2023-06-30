import {TruncatePipe} from './truncate.pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });

  it('transform text if length < 10 to libelle', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('action', 10)).toBe('action');
  });

  it('transform text if length > 10', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('action 2022', 10)).toBe('action 202...');
  });

  it('transform text if length > 10 et ellipsis = **', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('action 2022', 10, '**')).toBe('action 202**');
  });

});
