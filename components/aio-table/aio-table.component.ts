import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { aioTableLabels } from '../../../static-data/aio-table-data';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import { TableExportOption } from '@vex/interfaces/table-export-option.interface';
import { BasePaginatedResponse, Pagination } from '../../models/request.model';
import { Breadcrumb } from '@vex/components/breadcrumbs/interfaces/breadcrumb.model';
import { PaginatedItemsDataSource } from './interfaces/item-datasource.model';
import { FilterFormModalOutput } from '../filter-form-modal/interfaces/filter-form-modal.model';
import { ColorSchemeName } from '@vex/config/colorSchemeName';
import { ConfigService } from '@vex/config/config.service';
import { VexConfig } from '@vex/config/vex-config.interface';

@UntilDestroy()
@Component({
  selector: 'vex-aio-table',
  templateUrl: './aio-table.component.html',
  styleUrls: ['./aio-table.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AioTableComponent<T> implements OnInit, AfterViewInit, OnChanges {

  entities: T[];

  filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @Input()
  pageTitle: string;

  @Input()
  pageCrumbs: Breadcrumb[];

  @Input()
  entityNameSingular: string;

  @Input()
  entityNamePlurial: string;

  @Input()
  columns: TableColumn<T>[];

  @Input()
  dataSource: PaginatedItemsDataSource<T> | null;

  @Input()
  exportOptions: TableExportOption<T>[];

  @Input()
  addToolText: string;

  @Input()
  pageSize = 10;

  @Input()
  updateItemFunction: (data: any, onSuccess?: Function) => void;;

  @Input()
  createItemFunction: (onSuccess?: Function) => void;;

  @Input()
  findItemsFunction: (filter: Partial<T>) => Observable<BasePaginatedResponse<T>>;

  @Input()
  pageSizeOptions: number[] = [0, 5, 10, 20, 50];

  @Input()
  form: FilterFormModalOutput<T>;

  @Input()
  filterForm: UntypedFormGroup;

  @Input()
  openFilterFormFunction: (params: any) => MatDialogRef<any>;

  @Input()
  doLoadItemsPage: Date;

  @Input()
  doEnableShimmering: Date;

  @Input()
  doDisableShimmering: Date;

  @Input()
  emptyDataText: string;

  @Input()
  layout: 'boxed'|'fullwidth' = 'boxed';

  @Input()
  layoutUpdateFunction: (layout: 'boxed'|'fullwidth') =>  void;

  layoutCtrl = new UntypedFormControl(this.layout);

  public isShimmering: boolean;

  public filtersCount: number;

  private shimmeringData: any[] = [1,2,3,4,5,6,7,8,9,10];

  selection = new SelectionModel<T>(true, []);
  pagination: Pagination;
  labels = aioTableLabels;
  hasStartedLoading: boolean;

  config$: Observable<VexConfig> = this.configService.config$;

  isDark$: Observable<boolean> = this.config$.pipe(
    map(config => config.style.colorScheme === ColorSchemeName.dark)
  );

  shimmeringDefaultColorConfig = {
    '--shimmer-bg': '#edeef1',
    '--shimmer-color-1': '#edeef1',
    '--shimmer-color-2': '#f6f7f8',
    '--shimmer-color-3': '#f4f4f4',
    '--shimmer-color-4': '#edeef1'
  };

  shimmeringDarkModeColorConfig = {
    '--shimmer-bg': 'rgb(17, 21, 30)',
    '--shimmer-color-1': 'rgb(17, 21, 30)',
    '--shimmer-color-2': 'rgb(26, 30, 37)',
    '--shimmer-color-3': 'rgb(24, 27, 26)',
    '--shimmer-color-4': 'rgb(17, 21, 30)'
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private contentFilter: string = '';

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    // server side filtering method
    if(!this.dataSource) {
      this.dataSource = new PaginatedItemsDataSource<T>(
        this.findItemsFunction,
        this.enableShimmering.bind(this),
        this.disableShimmering.bind(this)
      );
    }

    this.form?.formGroup?.valueChanges
    .pipe(untilDestroyed(this))
    .subscribe(value => {
      this.onFilterChange();
      this.setFiltersCount();
    });

    if(!this.form?.formGroup) {
      this.enableShimmering();
    }

    this.layoutCtrl.valueChanges
    .pipe(untilDestroyed(this), filter(() => !!this.layoutUpdateFunction))
    .subscribe(this.layoutUpdateFunction)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.doLoadItemsPage?.firstChange === false) {
      this.loadItemsPage();
    } else if(changes?.doEnableShimmering?.firstChange === false) {
      this.enableShimmering();
    } else if(changes?.doDisableShimmering?.firstChange === false) {
      this.disableShimmering();
    } else if(changes?.layout) {
      this.layoutCtrl.setValue(changes?.layout.currentValue);
    }
  }

  openFilterForm() {
    if(this.openFilterFormFunction) {
      const ref = this.openFilterFormFunction(this.form);
      ref.afterClosed().subscribe((data) => {
        if ((!this.form?.propagationMode || this.form?.propagationMode === 'onvalid') && data) {
          this.onFilterChange(data);
        }
      })
    }
  }

  enableShimmering() {
    this.isShimmering = true;
    this.dataSource.setItems(this.shimmeringData);
    this.hasStartedLoading = true;
  }

  disableShimmering() {
    this.isShimmering = false;
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange
    .pipe(
        tap(() => this.paginator.pageIndex = 0),
        untilDestroyed(this)
    )
    .subscribe(
        () => this.filter$.next('')
    );

    this.paginator.page
    .pipe(
        tap(() => this.filter$.next('')),
        untilDestroyed(this)
    )
    .subscribe();

    this.filter$
    .pipe(debounceTime(500), untilDestroyed(this))
    .subscribe(() => this.loadItemsPage())
  }

  loadItemsPage() {
    this.dataSource.loadItems(
        this.contentFilter,
        !!this.sort.active && !!this.sort.direction ? `${this.sort.active}|${this.sort.direction}` : '',
        this.paginator.pageIndex,
        this.paginator.pageSize
    );
  }

  deleteItems(entities: T[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    alert('devrait supprimer les éléments en masse ! à implémenter');
    //entities.forEach(c => this.deleteItems(c));
  }

  onFilterChange(value?: any) {
    if (!this.dataSource) {
      return;
    }
    if (!!value) {
      this.form?.formGroup.patchValue(value);
    }
    this.contentFilter = value ?? this.form?.formGroup?.getRawValue();
    this.paginator.firstPage();
    this.filter$.next('');
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    //const numRows = this.dataSource.data.length;
    return false//numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() : null
      //this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: T, tagFieldName: string) {
    const index = this.entities.findIndex(c => c === row);
    this.entities[index][tagFieldName] = change.value;
    this.dataSource.setItems(this.entities);
  }

  setFiltersCount(): void {
    const values = this.form?.formGroup?.getRawValue() ?? {};
    const count = values ? Object.values(values).filter(value => !!value).length : 0;
    this.filtersCount = count;
  }
}
