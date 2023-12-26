import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormProductionRequestsComponent } from './form-production-requests/form-production-requests.component';
import { ProductionRequestsComponent } from './production-requests.component';
import { ProductionRequestsService } from './production-requests.service';


import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, TableModule, ToastModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import { RouterModule, Routes } from '@angular/router';
import { ClientShortageComponent } from './client-shortage/client-shortage.component';

const routes: Routes = [
  {path:'',component: ProductionRequestsComponent},
  {path:'add',component: FormProductionRequestsComponent},
  {path : 'ClientShortage' , component : ClientShortageComponent}

];
@NgModule({
  declarations: [
    ProductionRequestsComponent,
    FormProductionRequestsComponent,
    ClientShortageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    CardModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbToast,
    ModalModule,
    ButtonModule,
    NgSelectModule,
  ],
  providers:[
    ProductionRequestsService
  ]
})
export class ProductionRequestsModule { }
