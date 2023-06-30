import { Component, OnInit } from '@angular/core';
import { FormModalComponent } from '../../../components/form-modal/form-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contract, StatusEnum } from './interfaces/contract.model';
import { ContractService } from './contract.service';
import { ListingService } from '../../../utils/listing.service';
import { FormBuilder } from '@angular/forms';
import { createForm } from './forms/create.form';
import { updateForm } from './forms/update.form';
import { aioTableConfig } from './aio/table.config';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ContractCreateRequest, ContractFindRequest, ContractUpdateRequest } from './interfaces/contract.dto';
import { CustomerService } from '../customer.service';
import { FilterFormModalComponent } from '../components/filter-form-modal/filter-form-modal.component';
import { filterForm } from './forms/filter.form';
import { generateFilterForm } from '../components/filter-form-modal/filter-form-modal.service';
import { FilterFormModalOutput } from '../components/filter-form-modal/interfaces/filter-form-modal.model';
import { FormModalOutput } from '../components/form-modal/interfaces/form-modal.model';
import { Observable } from 'rxjs';
import { BasePaginatedResponse } from '../models/request.model';
import { Store } from '@ngrx/store';
import { Datatable } from '../models/preferences.model';
import { AppState } from '../reducers';
import { GlobalActions } from '../store/global.actions';
import { DatatableSelectors } from '../store/global.selectors';

@UntilDestroy()
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit {

  form: FilterFormModalOutput<Contract>;
  filter: Partial<ContractFindRequest>;
  doLoadItemsPage: Date = null;
  
  public aioTableConfig = aioTableConfig<Contract>(
    this.updateItem.bind(this),
    this.onExport.bind(this),
    this.deleteItem.bind(this),
    this.isItemActionVisible
  );
  datatableId = 'contract_main';
  datatable$: Observable<Datatable>;

  findItemsFunction = (filter: Partial<ContractFindRequest>): Observable<BasePaginatedResponse<Contract>> => {
    this.filter = filter;
    return this.contractService.find(filter);
  }

  layoutUpdateFunction = (layout: 'boxed'|'fullwidth'): void => {
    const datatable: Datatable = { id: this.datatableId, layout };
    this.store.dispatch(GlobalActions.UPSERT_DATATABLE({ data: datatable }));
  }

  constructor(private dialog: MatDialog,
              private contractService: ContractService,
              private customerService: CustomerService,
              private listingService: ListingService,
              private fb: FormBuilder,
              private store: Store<AppState>) {}

  ngOnInit(): void {
    this.datatable$ = this.store.select(DatatableSelectors.selectOneById(this.datatableId));
    this.initializeForm();
  }

  initializeForm(): void {
    const dataSourceFn = () => this.customerService.find({} as any);
    const filterFormModalOutput = filterForm(dataSourceFn);
    this.form = {
      ...filterFormModalOutput,
      formGroup: generateFilterForm(this.fb, filterFormModalOutput?.formConfig?.rows),
      propagationMode: 'onvalid'
    };
  }

  createItem(): MatDialogRef<FormModalComponent<Contract>> {
    const dataSourceFn = () => this.customerService.find({} as any);
    const dialogRef = this.dialog.open<FormModalComponent<Contract>, FormModalOutput<Contract>>(FormModalComponent<Contract>, {
      data : createForm(dataSourceFn),
      maxWidth: 800,
      width: '100%'
    });
    dialogRef.afterClosed().subscribe((output: ContractCreateRequest|null) => {
      if (output) {
        this.contractService.create(output).subscribe(() => {
          this.loadItemsPage();
        });
      }
    });
    return dialogRef;
  }

  updateItem(data: Contract): MatDialogRef<FormModalComponent<Contract>> {
    const dataSourceFn = () => this.customerService.find({} as any);
    const dialogRef = this.dialog.open<FormModalComponent<Contract>, FormModalOutput<Contract>>(FormModalComponent<Contract>, {
      data : updateForm(data,
                        dataSourceFn,
                        this.isItemActionVisible,
                        this.deleteItem.bind(this)
      ),
      maxWidth: 800,
      width: '100%'
    });
    dialogRef.afterClosed().subscribe((output: ContractUpdateRequest|null) => {
      if (output) {
        this.contractService.update(output).subscribe(() => {
          this.loadItemsPage();
        });
      }
    });
    return dialogRef;
  }

  deleteItem(item: Contract): void { 
    alert(`suppression de la ligne ${item.id}`);
  }

  openFilterForm(data: FilterFormModalOutput<Contract>): MatDialogRef<any> {
    return this.dialog.open(FilterFormModalComponent<Contract>, {
      data,
      maxWidth: 800,
      width: '100%'
    });
  }

  isItemActionVisible(item: Contract, label: string) {
    if(label === 'Clôturer') {
      return item.status === StatusEnum.new;
    }
    return true;
  }

  async onExport(format: string): Promise<void>{
    await this.listingService.export(Object.assign(this.form.formGroup?.value, {format}), 'contract');
  }

  private loadItemsPage(): void {
    this.doLoadItemsPage = new Date();
  }

}
