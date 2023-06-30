import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatListing'
})
export class FormatListingPipe<T> implements PipeTransform {

  transform(list: T[], sortingFunction?: (a: T, b: T) => number, maxResults?: number): T[] {
    let output;
    if(!!list) {
      const resultSortedByCriteria = [...list];
      if(!!sortingFunction) {
        resultSortedByCriteria.sort(sortingFunction);
      }
      output = (!!maxResults) ? resultSortedByCriteria.slice(0, maxResults) : resultSortedByCriteria;
    } else {
      output = [];
    }
    return output;
  }

}
