import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Clients, DataClients } from './modal/clients';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  today:Date = new Date();
  allClients:any[]=[];
  clientByName :any[]=[];
  clientName:string='';
  pagesRoleToPatch:any[]=[];
  selectedPageOpions:any[]=[];
  userMobile:string='';
  constructor(
   private _ClientsService: ClientsService,
   private userService:UsersService,
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
    if (this.clientName.length==0&&this.userMobile.length==0) {
      this.GetAllClients()
    }
    else if(this.clientName.length!=0&&this.userMobile.length==0){

      this._ClientsService.GetClientByName(this.clientName).subscribe({next:(res:any)=>{
        this.allClients=res.data
        console.log(res);

      },error:(err:any)=>{

        this.toastr.error("No client with this name")
       // this.GetAllClients();
      }
    }

  )}
  else if(this.clientName.length==0&&this.userMobile.length!=0){

    this._ClientsService.GetClientByName('',this.userMobile).subscribe({next:(res:any)=>{
      this.allClients=res.data
    },error:(err:any)=>{

      this.toastr.error("No client with this mobile number")
     // this.GetAllClients();
    }
  }

)}
else{
  this.toastr.error("choose only to filter with name or mobile number")
}

  }
  GetPermissionsOfRole(id: any) {
    this.userService.GetPermissionsOfRole(id).subscribe({
      next: (res: any) => {
        this.pagesRoleToPatch = res.data.filter((x:any)=>x.selected==true);
        this.pagesRoleToPatch.forEach(power => {
          this.selectedPageOpions.push(power.id)
        })
      }
    })
    this.selectedPageOpions=this.removeDuplicates(this.selectedPageOpions)
    console.log("GetPermissionsOfRole", this.selectedPageOpions);

  }
  removeDuplicates(arr: any[]):any[]{

    return [...new Set(arr)]
  }
  isAuthorized(permissionId:number) : boolean{
    return this.selectedPageOpions.includes(permissionId)
  }
 }
