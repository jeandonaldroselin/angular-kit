import { ValidatorFn, AbstractControl } from "@angular/forms";

export function inEnumValidator(enumList: Array<any>|object): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if(enumList.hasOwnProperty('indexOf')) {
        const castedEnumList = <Array<any>>enumList;
        if ((castedEnumList.indexOf(control.value) === -1)) {
          return { inEnum: true };
        }
      } else {
        const castedEnumList = <object>enumList;
        if (castedEnumList.hasOwnProperty(control.value) === false) {
            return { inEnum: true };
        }
      }
      return null;
  }
}