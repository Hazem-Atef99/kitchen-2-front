import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../clients/clients.service';
import { TopService } from '../../top/top.service';
import { Clients } from '../../clients/modal/clients';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-sanitary-connections',
  templateUrl: './form-sanitary-connections.component.html',
  styleUrls: ['./form-sanitary-connections.component.scss']
})
export class FormSanitaryConnectionsComponent implements OnInit {
  clientFileId :any;
  AddSanitaryConnectionsForm!:FormGroup;
  clientForm!:FormGroup;
  clientId: any;
  allClientFileNO : any[]=[];
  allClients: any[]=[];
  constructor(private formBuilder : FormBuilder,
              private _ClientsService:ClientsService,
              private topService:TopService,
              private _activatedRoute:ActivatedRoute) {
                this.AddSanitaryConnectionsForm=this.initSanitaryConnectionsForm();
                this.clientForm=this.initClientForm();
                this.clientFileId=this._activatedRoute.snapshot.queryParamMap.get('clientFileId')


  }

  ngOnInit(): void {
    this.GetAllClients();

  }

  addSanitaryConnection(){

  }
  initSanitaryConnectionsForm():FormGroup{
    return this.formBuilder.group({
      FileNo:['',[Validators.required]]
    })
  }
  initClientForm():FormGroup{
    return this.formBuilder.group({
      clientId: ['', [Validators.required]],
     phoneNumber: [null, [Validators.required]],
     clientAdress:[null,[Validators.required]]
    })
  }
  getClientInfo(clientId:any){
    this.clientId=clientId;
    console.log(clientId);
if (clientId) {
 this._ClientsService.GetClient(clientId).subscribe((res:any)=>{
   console.log(res);

   this.clientForm.patchValue({

     phoneNumber:res.data[0].mobile,
     clientAdress:res.data[0].clientAddress
   })
this.GetFileNo(this.clientId);
 })
}
 }
 GetFileNo(clientId:any){
  this.topService.getFileNumber(clientId).subscribe((res:any)=>{
     this.allClientFileNO=res.data

   })
}
GetAllClients() {
  this._ClientsService.GetAllClients().subscribe({
    next: (res: Clients) => {
      this.allClients = res.data
    }
  })
}
GetClientFileId(FileNo:any){
  this.topService.getClietFileId(this.clientId,FileNo).subscribe((res:any)=>{
    this.AddSanitaryConnectionsForm.patchValue({
      ClientFileId:res.data.clientFileId
    })
  })
  }
}
