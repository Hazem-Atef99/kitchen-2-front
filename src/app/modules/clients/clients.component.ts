import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Clients, DataClients } from './modal/clients';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  today:Date = new Date();
  allClients:any[]=[];
  clientByName :any[]=[];
  clientName:any;
  constructor(
   private _ClientsService: ClientsService,
   private toastr:ToastrService
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
  getclientbyName(){
    if (this.clientName.Length==0) {
      this.GetAllClients()
    }
    this._ClientsService.GetClientByName(this.clientName).subscribe({next:(res:any)=>{
      this.allClients=[res.data]
    },error:(err:any)=>{

      this.toastr.error("No client with this name")
      this.GetAllClients();
    }
  })
  }
 }
