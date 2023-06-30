import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { FileZoneModule } from '../../components/file-zone/file-zone.module';
import { PipeModule } from '../../pipes/pipe.module';
import { AsyncSelectModule } from '../async-select/async-select.component.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/fr';
import { DATE_FORMATS } from '../../utils/date-picker-config';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilterFormModal } from './interfaces/filter-form-modal.model';
import { FilterFormModalService } from './filter-form-modal.service';

@Component({
  selector: 'app-filter-form-modal',
  templateUrl: './filter-form-modal.component.html',
  styleUrls: ['./filter-form-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    AsyncSelectModule,
    MatDividerModule,
    FileZoneModule,
    PipeModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
    FilterFormModalService
  ]
})
export class FilterFormModalComponent<T> implements OnInit {

  form: UntypedFormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public inputData: { formConfig: FilterFormModal, data : T, formGroup?: UntypedFormGroup, propagationMode?: 'onvalid'|'onchange' },
              private dialogRef: MatDialogRef<FilterFormModalComponent<T>>,
              private fb: UntypedFormBuilder,
              private filterFormModalService: FilterFormModalService) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    const formBuildOrFormGroup = (!this.inputData?.propagationMode || this.inputData?.propagationMode === 'onvalid' || !this.inputData?.formGroup) ? this.fb : this.inputData?.formGroup;
    this.form = this.filterFormModalService.generateForm(formBuildOrFormGroup, this.inputData?.formConfig?.rows);
    if (this.inputData?.formGroup) {
      this.form.patchValue(this.inputData?.formGroup?.getRawValue());
    }
  }

  submit(): void {
    this.dialogRef.close(this.form.value);
  }
}
