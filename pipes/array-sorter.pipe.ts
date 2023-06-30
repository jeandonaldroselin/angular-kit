import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySorter'
})
export class ArraySorterPipe<T> implements PipeTransform {
  transform(inputItems: T[], key: string, direction: 'asc'|'desc' = 'asc'): T[] {
    if (!inputItems) {
      return inputItems;
    }
    const outputItems = JSON.parse(JSON.stringify(inputItems));
    outputItems.sort(this.sortByDirection(key, direction));
    return outputItems;
  }

  sortByDirection(key: string, direction: 'asc'|'desc' = 'asc'): (a: T, b: T) => number {
    return (a: T, b: T): number => {
      const aToSort = this.getValueDepth(a, key);
      const bToSort = this.getValueDepth(b, key);
      let output;
      if (aToSort < bToSort) {
        output = direction === 'asc' ? -1 : 1;
      } else if (aToSort > bToSort) {
        output = direction === 'asc' ? 1 : -1;
      } else {
        output = 0;
      }
      return output;
    }
  }

  getValueDepth(object: T, key: string): string {
    if(typeof object === 'string') {
      return object;
    }
    const keysToNavigate = key.toString().split('.');
    let output: string|T = object;
    keysToNavigate.forEach((keyToNavigate: string) => {
      output = output[keyToNavigate] ?? output ;
    });
    return typeof output === 'string' ? output : '';
  }
}
