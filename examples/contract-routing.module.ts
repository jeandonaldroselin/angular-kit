import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { ContractComponent } from './contract.component';

const routes: VexRoutes = [
  {
    path: '',
    component: ContractComponent,
    data: {
      toolbarShadowEnabled: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class ContractRoutingModule {
}
