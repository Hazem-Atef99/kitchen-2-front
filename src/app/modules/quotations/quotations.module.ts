import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationsComponent } from '../quotations/quotations.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, TableModule, ToastModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { QuotationsService } from './quotations.service';
import { FormQuotationComponent } from './form-quotation/form-quotation.component';
import { NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import { ClientsModule } from '../clients/clients.module';

const routes: Routes = [
  {path:'',component: QuotationsComponent},
  {path:'add',component: FormQuotationComponent},

];


@NgModule({
  declarations: [
    QuotationsComponent,
    FormQuotationComponent
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
        ClientsModule

    ],
  providers: [ QuotationsService]
})
export class QuotationsModule { }
