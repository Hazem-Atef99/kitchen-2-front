import { FormClientsComponent } from './form-clients/form-clients.component';
import { ClientsComponent } from './clients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', component: ClientsComponent },
   { path: 'addClient', component: FormClientsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
