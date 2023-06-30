import { ValidatorFn, AbstractControl } from "@angular/forms";

export function fieldsAreSameValidator(firstFieldName: string, secondFieldName: string): ValidatorFn {
  return (group: AbstractControl) => { 
    let firstFieldValue = group.get(firstFieldName)?.value;
    let secondFieldValue = group.get(secondFieldName)?.value
    return firstFieldValue === secondFieldValue ? null : { fieldsAreSame: true }
  }
}