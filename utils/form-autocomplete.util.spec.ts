import {selectMatchingItem, suggestItems} from './form-autocomplete.util';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {CommonModule} from '@angular/common';
import {createAction, props, Store} from '@ngrx/store';
import {AppState} from '@project/app.states';

describe('FormAutocompleteUtil', () => {
  let store: MockStore<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({})
      ],
      imports: [
        CommonModule
      ],
      declarations: [],
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  describe('selectMatchingItem', () => {

    it ('should not find item if the array is empty', () => {
      const results: { affaire : { libelle : string}}[] = []
      const search = selectMatchingItem('libelleAbc', results, 'affaire.libelle', (foundItem: { affaire : { libelle : string }}) => {});
      expect(search).toBeFalsy();
    });

    it ('should not find item if not content match', () => {
      const results: { affaire : { libelle : string}}[] = [{ affaire : { libelle : 'libelle' }}]
      const search = selectMatchingItem('libelle1', results, 'affaire.libelle', (foundItem: { affaire : { libelle : string }}) => {});
      expect(search).toBeFalsy();
    });

    it ('should find item by simple attribute', () => {
      const results: { affaire : string}[] = [{ affaire : 'QuelleAffaire'}]
      const search = selectMatchingItem('QuelleAffaire', results, 'affaire', (foundItem: { affaire : string}) => {});
      expect(search).toBeTruthy();
    });

    it ('should find item by deep attribute', () => {
      const results: { affaire : { libelle : string}}[] = [{ affaire : { libelle : 'libelle1' }}]
      const search = selectMatchingItem('libelle1', results, 'affaire.libelle', (foundItem: { affaire : { libelle : string }}) => {});
      expect(search).toBeTruthy();
    });
  });

  describe('suggestItems', () => {

    it ('should trigger the store filtering action when a string value is provided', () => {
      // Given
      const storeSpy = spyOn(store, 'dispatch').and.callThrough();
      const key = 'key';
      const value = 'stringValue';
      const storeFilteringAction = createAction('[Test] - filtering', props<any>());
      const storeSearchAction = createAction('[Test] - search');
      const emptyFunction = () => {};
      // When
      suggestItems(
        key, value,
        (filters: any) => store.dispatch(storeFilteringAction(filters)),
        () => store.dispatch(storeSearchAction()),
        emptyFunction
      );
      // Then
      expect(storeSpy).toHaveBeenCalledTimes(2);
      expect(storeSpy).toHaveBeenCalledWith(storeFilteringAction({ filters: { key: 'stringValue' } }));
      expect(storeSpy).toHaveBeenCalledWith(storeSearchAction());
    });

    it ('should trigger the store filtering action when an object value is provided', () => {
      // Given
      const storeSpy = spyOn(store, 'dispatch').and.callThrough();
      const key = 'key';
      const value = { key : 'objectValue' };
      const storeFilteringAction = createAction('[Test] - filtering', props<any>());
      const storeSearchAction = createAction('[Test] - search');
      const emptyFunction = () => {};
      // When
      suggestItems(
        key, value,
        (filters: any) => store.dispatch(storeFilteringAction(filters)),
        () => store.dispatch(storeSearchAction()),
        emptyFunction
      );
      // Then
      expect(storeSpy).toHaveBeenCalledTimes(1);
      expect(storeSpy).toHaveBeenCalledWith(storeFilteringAction({ filters: { key: 'objectValue' } }));
    });

  });

});
