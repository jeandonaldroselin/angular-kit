import { AsyncValidatorFn, FormControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn } from "@angular/forms";
import { FileZoneItem } from "../file-zone/interfaces/file-zone.model";
import { FormModalRow, FormModalField, FormModal, FormModalEnctypeType, FormModalValidator } from "./interfaces/form-modal.model";
import { Injectable } from "@angular/core";

@Injectable()
export class FormModalService {

  generateForm(fb: UntypedFormBuilder, formModalRows: FormModalRow[]): UntypedFormGroup {
    const form = fb.group({});
    this.flatFields(formModalRows).forEach(field => this.addField(form, field));
    return form;
  }
  
  generateOutput(formGroup: UntypedFormGroup, enctype: FormModalEnctypeType, formModal: FormModal, fieldSubKey = '[attachment]'): FormData|object {
    switch(enctype) {
      case 'multipart/form-data':
        const formData = new FormData(), flattenedFields = this.flatFields(formModal.rows);
        Object.entries(formGroup.value).forEach(fieldEntry =>  this.addValueToFormData(fieldEntry, flattenedFields, formData, fieldSubKey));
        return formData;
      case 'application/x-www-form-urlencoded':
      default:
        return formGroup.value;
    }
  }
  
  private filterValidator<ValidatorType>(field: Partial<FormModalField<any>>, mapper: (formModalValidator: FormModalValidator) => boolean) {
    return field.validators ? Object.entries(field.validators)
    .filter((validator: [key: string, value: FormModalValidator]) => mapper(validator[1])).map(validator => validator[1].validator as unknown as ValidatorType) : [];
  }
  
  private addField(form: UntypedFormGroup, field: Partial<FormModalField<any>>): void {
    const validators: ValidatorFn[] = this.filterValidator<ValidatorFn>(field, (formModalValidator: FormModalValidator) => !!formModalValidator && !formModalValidator?.isAsync);
    const asyncValidators: AsyncValidatorFn[] = this.filterValidator<AsyncValidatorFn>(field, (formModalValidator: FormModalValidator) => !!formModalValidator && formModalValidator?.isAsync);
    const control: FormControl = new FormControl({ value: field?.value === undefined ? null : field?.value, disabled: field?.disabled }, {validators, asyncValidators});
    form.addControl(field.name, control);
  }
  
  private flatFields(formModalRows: FormModalRow[]) : Partial<FormModalField<any>>[] {
    return formModalRows.reduce((previous: Partial<FormModalField<any>>[], current: FormModalRow) => (previous.concat(current.fields)), [])
  }
  
  private addValueToFormData(prop: [string, any], fields: Partial<FormModalField<any>>[], formData: FormData, fieldSubKey = '[attachment]') {
    const fieldName = prop[0], fieldValue = prop[1];
    const hasFileType = (currentFieldName: string, formModalField: FormModalField<any>) => formModalField.name === currentFieldName && formModalField.type === 'file';
    const isFileField = fields.some((formModalField: FormModalField<any>) => hasFileType(fieldName, formModalField));
    const canSelectMultipleFile = fields.some((formModalField: FormModalField<any>) => hasFileType(fieldName, formModalField) && formModalField.config?.file?.multiple === true);
    const getFileContent = (fileZoneItem: FileZoneItem) => fileZoneItem.file as Blob ?? fileZoneItem.id.toString();
    if(isFileField) {
      fieldValue.forEach((fileZoneItem: FileZoneItem, index: number) => formData.append(`${fieldName}${canSelectMultipleFile ? `[${index}]` : ``}${fieldSubKey}`, getFileContent(fileZoneItem)));
    } else {
      formData.append(fieldName, fieldValue);
    }
  }
}
