import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationsComponent } from '../quotations/quotations.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule, FormModule, GridModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { QuotationsService } from './quotations.service';
import { FormQuotationComponent } from './form-quotation/form-quotation.component';
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
    ReactiveFormsModule
  ],
  providers: [ QuotationsService]
})
export class QuotationsModule { }
