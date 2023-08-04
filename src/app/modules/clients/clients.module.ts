import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardModule, FormModule, GridModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
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
    HttpClientModule
  ],
  providers: [ClientsService]
})
export class ClientsModule { }
