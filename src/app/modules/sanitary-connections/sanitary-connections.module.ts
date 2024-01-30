import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TableModule, CardModule, GridModule, FormModule, ModalModule, ButtonModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SanitaryConnectionsComponent } from './sanitary-connections.component';
import { FormSanitaryConnectionsComponent } from './form-sanitary-connections/form-sanitary-connections.component';
const routes: Routes = [
  {path:'',component: SanitaryConnectionsComponent},
  {path:'add',component: FormSanitaryConnectionsComponent},

];


@NgModule({
  declarations: [
    SanitaryConnectionsComponent,
    FormSanitaryConnectionsComponent
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
export class SanitaryConnectionsModule { }
