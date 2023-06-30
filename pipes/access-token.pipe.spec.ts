import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { metaReducers, reducers } from '../reducers';
import { AccessTokenPipe } from './access-token.pipe';

describe('AccessTokenPipe', () => {
  let pipe: AccessTokenPipe;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
      ],
      declarations: [
        AccessTokenPipe
      ],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers })
      ],
    });
    pipe = TestBed.inject(AccessTokenPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call getCachelessContent with a timestamped content', () => {
    const content = pipe.getCachelessContent('content');
    expect(content).toEqual(`content?time=${moment().unix()}`);
  });

  it('should call getTokenizedContent with an empty token', async() => {
    const content = await pipe.getTokenizedContent('content?time=12345');
    expect(content).toEqual(`${content}&access_token=`);
  });

});
