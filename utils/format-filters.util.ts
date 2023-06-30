import {RequestParamAggregator} from './request-param-aggregator';

export function formatFilters(filters: object, filtersExclude: string[] = []): string {
  return Object.keys(filters || {}).reduce((aggregator, filter)=>{
    if (!filtersExclude.includes(filter)) {
      aggregator.addParam(filter, filters[filter]);
    }
    return aggregator;
  }, new RequestParamAggregator()).getParams().toString();
}
