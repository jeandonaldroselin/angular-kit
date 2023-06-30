import { ValidatorFn, AbstractControl } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

export function asyncStatusValidator(subject: BehaviorSubject<{status: 'success'|'error'|'initial'}>, validStatuses: ('success'|'error'|'initial')[] = ['success']): ValidatorFn {
  return (control: AbstractControl) => { 
    const subjectStatus = subject.getValue()?.status;
    return validStatuses.some(status => status === subjectStatus) ? null : { asyncStatus: true }
  }
}