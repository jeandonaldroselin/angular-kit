import { ValidatorFn, AbstractControl } from "@angular/forms";

export function requiredFromListValidator(identifier: string): ValidatorFn {
  return (control: AbstractControl) => { 
    const value = control.value;
    const isSelectedFromList = !!value && !!value[identifier];
    return isSelectedFromList ? null : { requiredFromList: true }
  }
}