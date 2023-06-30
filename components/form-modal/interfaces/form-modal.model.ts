import { AsyncValidator, AsyncValidatorFn, UntypedFormGroup, Validator, ValidatorFn } from "@angular/forms";

// Form
export interface FormModal {
  rows: FormModalRow[];
  titleType: TitleType;
  titleContent: string|string[];
  enctype: FormModalEnctypeType;
  cancelButtonText: string;
  confirmButtonText: string;
  options: Partial<FormModalAction>[];
}

export type TitleType = 'simple'|'field-content';
export type FormModalEnctypeType = 'multipart/form-data'|'application/x-www-form-urlencoded';

export interface FormModalOutput<DataType> {
  data: DataType|null;
  formConfig: Partial<FormModal>;
  formGroup: UntypedFormGroup;
}

export interface FormModalAction {
  icon: string;
  label: string;
  click: Function;
  isVisible: Function;
}

// Row
export interface FormModalRow {
  fields: Partial<FormModalField<any>>[];
}

// Field
export interface FormModalField<T> {
  type: FormModalFieldType;
  name: string;
  label: string;
  icon: string;
  value: T|FormModalFieldValueType;
  colSize: 1|2|3|4|6|8|9|10|11|12;
  validators: FormModalValidatorList;
  disabled: boolean;
  hintText: string;
  config: Partial<FormModalFieldConfig<T>>;
}

export type FormModalFieldType = 'text'|'number'|'textarea'|'date'|'select'|'checkbox'|'file'|'asyncSelect'|'hidden';
export type FormModalFieldValueType = string|Number|any;

//Field Specific Config
export interface FormModalFieldSelectConfig<T> {
  options: Partial<FormModalFieldSelectOption<T>>[];
  hasEmptyValue: boolean;
}

export interface FormModalFieldSelectOption<T> {
  label: string;
  value: T;
  disabled: (...args) => boolean;
  visible: (...args) => boolean;
}

export interface FormModalFieldFileConfig {
  accept: string;
  confirmDelete: boolean;
  multiple: boolean;
}

export interface FormModalFieldAsyncSelectConfig {
  dataSourceMappingFn: Function;
  hasEmptyValue: boolean;
  loadingMethod: 'onclick'|'ondisplay';
  loadingText: string;
  dataSourceFn: Function;
}

export interface FormModalFieldConfig<T> {
  select: Partial<FormModalFieldSelectConfig<T>>;
  file: Partial<FormModalFieldFileConfig>;
  asyncSelect: Partial<FormModalFieldAsyncSelectConfig>;
}

// Validator
export interface FormModalValidatorList {
  [key: string] : Partial<FormModalValidator>;
}

export interface FormModalValidator {
  validator: Validator | ValidatorFn | AsyncValidator | AsyncValidatorFn;
  isAsync: boolean;
  errorMessage: string;
  successMessage: string;
}