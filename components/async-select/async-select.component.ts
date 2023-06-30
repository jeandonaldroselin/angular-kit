import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';
import { FormModalField } from '../form-modal/interfaces/form-modal.model';
import { SelectOption } from './interfaces/async-select.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@UntilDestroy()
@Component({
  selector: 'app-async-select',
  templateUrl: './async-select.component.html',
  styleUrls: ['./async-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class AsyncSelectComponent implements OnInit {

  private _dataSourceFn: Function;
  @Input()
  set dataSourceFn(input: Function) {
    if(input) this._dataSourceFn = input;
  }
  get dataSourceFn() { return this._dataSourceFn; }

  private _dataSourceMappingFn: Function = (data) => data;
  @Input()
  set dataSourceMappingFn(input: Function) {
    if(input) this._dataSourceMappingFn = input;
  }
  get dataSourceMappingFn() { return this._dataSourceMappingFn; }

  @Input()
  field: Partial<FormModalField<any>>;

  @Input()
  appearance: MatFormFieldAppearance;

  @Input()
  control: any = new FormControl(null, [Validators.required]);

  @Input()
  errorTemplate: TemplateRef<any>;

  private _loadingText: string = 'Chargement en cours...';
  @Input()
  set loadingText(input: string) {
    if(input) this._loadingText = input;
  }
  get loadingText() { return this._loadingText; }

  private _noDatasourceProvided: string = 'Source de données invalide (@Input dataSourceFn)';
  @Input()
  set noDatasourceProvided(input: string) {
    if(input) this._noDatasourceProvided = input;
  }
  get noDatasourceProvided() { return this._noDatasourceProvided; }

  private _loadingMethod: 'onclick'|'ondisplay' = 'onclick';
  @Input()
  set loadingMethod(input: 'onclick'|'ondisplay') {
    if(input) this._loadingMethod = input;
  }
  get loadingMethod() { return this._loadingMethod; }

  private _hintText: string = 'Selectionnez un élément de la liste';
  @Input()
  set hintText(input: string) {
    if(input !== undefined) this._hintText = input;
  }
  get hintText() { return this._hintText; }

  @ViewChild('selectControl') selectControl: MatSelect;

  options: SelectOption[] = [];

  private lastSelectedValue: number|string = null;

  public isLoading = false;

  public isOpen = false;

  constructor() {}

  ngOnInit(): void {
    this.initializeField();
  }

  initializeField(): void {
    const isControlFilled = this.control?.value != null && this.control?.value != undefined;
    if(isControlFilled) {
      this.lastSelectedValue = this.control.value;
    }
    if(isControlFilled || this.loadingMethod === 'ondisplay') {
      this.openChanged(true);
    }
  }

  openChanged(event): void {
    this.isOpen = event;
    if (event && this.options.length === 0) {
      this.isLoading = event;
      this.options = [];
      if(!this.lastSelectedValue) {
        this.control.reset();
      }
      if(!!this.dataSourceFn()) {
        this.dataSourceFn()
        .pipe(
          map((data) => this.dataSourceMappingFn ? this.dataSourceMappingFn(data) : data),
          untilDestroyed(this)
        )
        .subscribe((options: SelectOption[]) => {
          if (options.length != undefined && this.isLoading) {
            this.options = options;
            this.isLoading = false;
            if (
              this.options.length &&
              this.lastSelectedValue !== null &&
              this.options.some((option) => option.id == this.lastSelectedValue)
            ) {
              this.control.setValue(this.lastSelectedValue);
              this.selectControl?.close();
            }
          }
        });
      } else {
        this.isLoading = false;
        const option = { id: 0, label: this.noDatasourceProvided };
        this.options = [option];
        this.control.setValue(option.id);
        this.selectControl?.close();
      }
    }
  }
}
