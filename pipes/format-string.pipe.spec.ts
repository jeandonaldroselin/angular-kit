import { TestBed } from '@angular/core/testing';
import { FormatStringPipe } from './format-string.pipe';

fdescribe('FormatStringPipe', () => {
  let pipe: FormatStringPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [
        FormatStringPipe
      ],
      imports: [],
    });
    pipe = TestBed.inject(FormatStringPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call transform and return a formatted string with one parameter', () => {
    // Given
    const text: string = 'hello {0}, welcome to this app';
    const formattedOutput = pipe.transform(text, {0:'John'});
    // When
    const expectedOutput = 'hello John, welcome to this app';
    // Then
    expect(formattedOutput).toEqual(expectedOutput);
  });

  it('should call transform and return a formatted string with two parameters', () => {
    // Given
    const text: string = 'hello {0}, welcome to {1}';
    const formattedOutput = pipe.transform(text, {0:'John', 1: 'this app'});
    // When
    const expectedOutput = 'hello John, welcome to this app';
    // Then
    expect(formattedOutput).toEqual(expectedOutput);
  });

  it('should call transform and return an unchanged string', () => {
    // Given
    const text: string = 'hello {0}, welcome to this app';
    const formattedOutput = pipe.transform(text, {});
    // When
    const expectedOutput = 'hello {0}, welcome to this app';
    // Then
    expect(formattedOutput).toEqual(expectedOutput);
  });

});
