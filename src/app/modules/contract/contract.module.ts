import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationsComponent } from '../quotations/quotations.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, TableModule, ToastModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { ContractService } from './contract.service';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import {ContractComponent} from "./contract.component";

const routes: Routes = [
  {path:'',component: ContractComponent},
  {path:'add',component: ContractFormComponent},

];


@NgModule({
  declarations: [
    ContractComponent,
    ContractFormComponent
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
  providers: [ ContractService]
})
export class ContractModule { }
