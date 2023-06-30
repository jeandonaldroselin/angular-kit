import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'displayOption'
})
export class DisplayOptionPipe implements PipeTransform {

  transform(option: any, fields?: string[]): string {
    let display = '';
    if (!!option) {
      if (!!fields) {
        fields.forEach((f) => {
          display = this.transformField(display, f, option);
        });
      } else {
        display = option;
      }
    }
    return display;
  }

  private transformField(display: string, field: string, option: any) {
    if (display === '') {
      const champs = this.split(field);
      let value = option;
      champs.forEach((c) => {
        value = this.getValue(value, c);
      })
      if (!!value) {
        display = value;
      }
    }
    return display;
  }

  private getValue(value, c: string) {
    if (!!value && value.hasOwnProperty(c)) {
      return value[c];
    } else {
      return null;
    }
  }

  private split(champ: string): string[] {
    let champs = []
    if (!!champ) {
      champs = champ.split('.');
    }
    return champs;
  }

}
