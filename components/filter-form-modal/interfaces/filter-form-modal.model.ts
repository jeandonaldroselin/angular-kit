import { UntypedFormGroup } from "@angular/forms";

export interface FilterFormModal {
  rows: FilterFormModalRow[];
  titleContent?: string|string[];
  cancelButtonText?: string;
  confirmButtonText?: string;
  options?: FilterFormModalAction[];
}

export interface FilterFormModalRow {
  fields: FilterFormModalField<any>[];
}

export type FilterFormModalFieldType = 'text'|'date'|'select'|'checkbox'|'asyncSelect';

export interface FilterFormModalField<T> {
  type: FilterFormModalFieldType;
  name: string;
  label?: string;
  icon?: string;
  value: T|string|number|any;
  colSize?: 1|2|3|4|6|8|9|10|11|12;
  disabled?: boolean;
  hintText?: string;
  config?: {
    select?: {
      options?: FilterFormModalSelectOption<T>[];
      hasEmptyValue?: boolean;
    },
    asyncSelect?: {
      dataSourceMappingFn?: Function;
      hasEmptyValue?: boolean;
      loadingMethod?: 'onclick'|'ondisplay';
      loadingText?: string;
      dataSourceFn?: Function;
    }
  }
}

export interface FilterFormModalSelectOption<T> {
  label: string;
  value: T;
  disabled?: (...args) => boolean;
  visible?: (...args) => boolean;
}

export interface FilterFormModalAction {
  icon: string;
  label: string;
  click: Function;
  isVisible: Function;
}

export interface FilterFormModalOutput<T> {
    data: T|null;
    formConfig: FilterFormModal;
    formGroup?: UntypedFormGroup;
    propagationMode?: 'onvalid'|'onchange';
}
