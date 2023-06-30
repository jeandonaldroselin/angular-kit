import { FormControl, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { FilterFormModalRow, FilterFormModalField } from "./interfaces/filter-form-modal.model";
import { Injectable } from "@angular/core";

@Injectable()
export class FilterFormModalService {

  generateForm(formBuildOrFormGroup: UntypedFormBuilder|UntypedFormGroup, filterFormModalRows: FilterFormModalRow[]): UntypedFormGroup {
    const form = formBuildOrFormGroup instanceof FormBuilder ? formBuildOrFormGroup.group({}) : formBuildOrFormGroup;
    this.flatFields(filterFormModalRows).forEach(field => this.addField(form, field));
    return form;
  }
  
  private addField(form: UntypedFormGroup, field: Partial<FilterFormModalField<any>>): void {
    const control: FormControl = new FormControl({ value: field?.value === undefined ? null : field?.value, disabled: field?.disabled });
    form.addControl(field.name, control);
  }
  
  private flatFields(filterFormModalRows: FilterFormModalRow[]) : Partial<FilterFormModalField<any>>[] {
    return filterFormModalRows.reduce((previous: Partial<FilterFormModalField<any>>[], current: FilterFormModalRow) => (previous.concat(current.fields)), [])
  }
}
