import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormProductionRequestsComponent } from './form-production-requests/form-production-requests.component';
import { ProductionRequestsComponent } from './production-requests.component';
import { ProductionRequestsService } from './production-requests.service';


import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, SpinnerModule, TableModule, ToastModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import { RouterModule, Routes } from '@angular/router';
import { ClientShortageComponent } from './client-shortage/client-shortage.component';
import { ClientShortageDetailsComponent } from './client-shortage-details/client-shortage-details.component';
import { ReportProductionRequestsComponent } from './report-production-requests/report-production-requests.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const routes: Routes = [
  {path:'',component: ProductionRequestsComponent},
  {path:'add',component: FormProductionRequestsComponent},
  {path : 'ClientShortage' , component : ClientShortageComponent},
  {path : 'production-requests/clientShortageDetial' , component:ClientShortageDetailsComponent},
  {path : 'print',component:ReportProductionRequestsComponent}

];
@NgModule({
  declarations: [
    ProductionRequestsComponent,
    FormProductionRequestsComponent,
    ClientShortageComponent,
    ClientShortageDetailsComponent,
    ReportProductionRequestsComponent
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
    PdfViewerModule,
    SpinnerModule
  ],
  providers:[
    ProductionRequestsService
  ]
})
export class ProductionRequestsModule { }
