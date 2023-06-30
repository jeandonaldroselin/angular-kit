import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { ContractRoutingModule } from './contract-routing.module';
import { AioTableModule } from '../components/aio-table/aio-table.module';
import { FormModalModule } from '../components/form-modal/form-modal.module';
import { FilterFormModalComponent } from '../components/filter-form-modal/filter-form-modal.component';

@NgModule({
  declarations: [ContractComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    AioTableModule,
    FormModalModule,
    FilterFormModalComponent
  ]
})
export class ContractModule { }
