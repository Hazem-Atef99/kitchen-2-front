import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Clients, DataClients } from './modal/clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  today:Date = new Date();
  allClients:DataClients[]=[];
  constructor(
   private _ClientsService: ClientsService
  ){}
  ngOnInit(): void {
      this.GetAllClients();
  }
  GetAllClients(){
   this._ClientsService.GetAllClients().subscribe({
     next:(res:Clients)=>{
       this.allClients = res.data
     }
   })
  }
 }