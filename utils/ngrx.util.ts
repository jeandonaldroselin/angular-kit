import {createSelector, Selector} from '@ngrx/store';
import {EntityAdapter} from '@ngrx/entity';

const selectEntities = (entitySelector: Selector<any, any>, adapter: EntityAdapter<any>) => createSelector(
  entitySelector,
  adapter.getSelectors().selectEntities
);

export const selectOneEntityById = (entityName: string,
                                    entitySelector: Selector<any, any>,
                                    adapter: EntityAdapter<any>) => createSelector(
  selectEntities(entitySelector, adapter),
  (entities) => entities[entityName]
);
