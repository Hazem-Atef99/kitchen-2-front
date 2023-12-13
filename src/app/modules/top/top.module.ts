import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TableModule, CardModule, GridModule, FormModule, ModalModule, ButtonModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TopComponent } from './top/top.component';
import { FormTopComponent } from './form-top/form-top.component';
const routes : Routes=[
{path:'',component:TopComponent},
{path:'form-top',component:FormTopComponent}
]


@NgModule({
  declarations: [
    TopComponent,
    FormTopComponent
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
  ]
})
export class TopModule { }
