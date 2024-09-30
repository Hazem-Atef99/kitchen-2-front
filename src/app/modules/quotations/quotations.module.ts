import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationsComponent } from '../quotations/quotations.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, SpinnerModule, TableModule, ToastModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { QuotationsService } from './quotations.service';
import { FormQuotationComponent } from './form-quotation/form-quotation.component';
import { NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReportQutationComponent } from './report-qutation/report-qutation.component';
const routes: Routes = [
  {path:'',component: QuotationsComponent},
  {path:'add',component: FormQuotationComponent},
  {path:'print',component: ReportQutationComponent}
];


@NgModule({
  declarations: [
    QuotationsComponent,
    FormQuotationComponent,
    ReportQutationComponent,

  ],
    imports: [
        PdfViewerModule,
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
        SpinnerModule,
        NgSelectModule,
    ],
  providers: [ QuotationsService]
})
export class QuotationsModule { }
