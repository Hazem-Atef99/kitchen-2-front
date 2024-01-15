import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, TableModule, ToastModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import { RouterModule, Routes } from '@angular/router';
import { ClientsService } from './clients.service';
import { ClientsComponent } from './clients.component';
import { FormClientsComponent } from './form-clients/form-clients.component';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'add', component: FormClientsComponent },

];

@NgModule({
  declarations: [
    ClientsComponent,
    FormClientsComponent
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
  providers: [ClientsService]
})
export class ClientsModule { }
