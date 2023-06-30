import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'formatObject'
})
export class FormatObjectPipe<T, U> implements PipeTransform {

  transform(fieldContent: T, completeObject: U, formatFunction: (fieldContent: T, completeObject: U) => string): string {
    return formatFunction(fieldContent, completeObject);
  }

}
