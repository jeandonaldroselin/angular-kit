import { ValidatorFn, AbstractControl } from "@angular/forms";

export function toEqualValidator(fieldName: string): ValidatorFn {
  return (group: AbstractControl): { [key: string]: boolean } | null => {
      if (group.value != group.get(fieldName)) {
        return { toEqual : true }
      }
      return null;
  }
}