import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'formatString'
})
export class FormatStringPipe implements PipeTransform {

  transform(value: string, args: object): string {
    let output: string;
    if (!!args) {
      output = value.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined' ? args[number] : match;
      });
    } else {
      output = value;
    }
    return output;
  }

}
