import { FollowsComponent } from './follows.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TableModule, CardModule, GridModule, FormModule, ModalModule, ButtonModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormFollowsComponent } from './form-follows/form-follows.component';

const routes:Routes=[
  {path:'',component:FollowsComponent}
]

@NgModule({
  declarations: [
    FollowsComponent,
    FormFollowsComponent
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
export class FollowsModule { }
