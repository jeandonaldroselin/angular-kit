import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayFilter',
  pure: false
})
export class ArrayFilterPipe implements PipeTransform {
  transform(items: unknown[], key: string, value: unknown): unknown[] {
    if (!items || !items.length || !key) {
      return items;
    }
    return items.filter((item) => item[key] === value);
  }
}
