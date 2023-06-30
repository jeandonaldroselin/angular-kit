import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function bothEmptyOrRequired(firstField: string, secondField: string): ValidatorFn {

  return (formGroup: FormGroup): ValidationErrors | null => {
    const firstFieldValue = formGroup.get(firstField).value;
    const secondFieldValue = formGroup.get(secondField).value;

    if (firstFieldValue && !secondFieldValue) {
      return {bothEmptyOrRequired: secondField};
    } else if (!firstFieldValue && secondFieldValue) {
      return {bothEmptyOrRequired: firstField};
    } else {
      return null;
    }
  }
}
