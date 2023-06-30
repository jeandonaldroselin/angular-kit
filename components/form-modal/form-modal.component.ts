import { Component, Inject, OnInit } from '@angular/core';
import { FormControlStatus, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validator, ValidatorFn } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormModal } from './interfaces/form-modal.model';
import { FormModalService } from './form-modal.service';
import { CommonModule } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { AsyncSelectComponent } from '../async-select/async-select.component';
import { FileZoneComponent } from '../file-zone/file-zone.component';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { DATE_FORMATS } from 'src/app/utils/date-picket-config';

@UntilDestroy()
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
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
    AsyncSelectComponent,
    MatDividerModule,
    FileZoneComponent,
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
    FormModalService
  ]
})
export class FormModalComponent<T> implements OnInit {

  form: UntypedFormGroup;
  isValid: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public inputData: { formConfig: FormModal, data : T },
              public dialogRef: MatDialogRef<FormModalComponent<T>>,
              private fb: UntypedFormBuilder,
              private formModalService: FormModalService) {}

  ngOnInit(): void {
    this.createForm();
  }
 
  private createForm(): void {
    this.form = this.formModalService.generateForm(this.fb, this.inputData?.formConfig?.rows);
    this.listenFormStatus();
  }

  private listenFormStatus(): void {
    this.form.statusChanges
    .pipe(untilDestroyed(this))
    .subscribe((status: FormControlStatus) => this.isValid = status === 'VALID');
  }

  submit(): void {
    this.dialogRef.close(
      this.formModalService.generateOutput(
        this.form,
        this.inputData.formConfig.enctype,
        this.inputData.formConfig
      )
    );
  }
}
