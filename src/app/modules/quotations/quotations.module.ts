import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationsComponent } from '../quotations/quotations.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule, FormModule, GridModule, TableModule } from '@coreui/angular';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { QuotationsService } from './quotations.service';
const routes: Routes = [
  {path:'',component: QuotationsComponent}
];


@NgModule({
  declarations: [
    QuotationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    DocsComponentsModule,
    CardModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ QuotationsService]
})
export class QuotationsModule { }
