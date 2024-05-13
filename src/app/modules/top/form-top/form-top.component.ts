import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../clients/clients.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients } from '../../clients/modal/clients';
import { ActivatedRoute, Router } from '@angular/router';
import { TopService } from '../top.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-top',
  templateUrl: './form-top.component.html',
  styleUrls: ['./form-top.component.scss']
})
export class FormTopComponent implements OnInit {
  clientFileId :any;
  clientForm!: FormGroup;
  deviceForm!:FormGroup;
  allClients : any[]=[];
  allClientFileNO : any[]=[];
  allTopLists:any;
  AddTopForm!:FormGroup;
  clientId:any;
  types: any;
  viewImg: any[] = [];
  uploadedImg: any[] = [];
  AddedDevices: any[] = [];
  viewImageContent:any[] = [];
  viewUploadedImageContent:any[] = [];
  ShowImage: any;
  detailId: string | null;
  constructor(private _ClientsService:ClientsService,
              private _FormBuilder: FormBuilder,
              private _activatedRoute:ActivatedRoute,
              private toastr: ToastrService,
              private topService:TopService ,
              private _Router:Router){
    this.clientForm=this.initClientForm()
    this.AddTopForm=this.initTopForm()
    this.deviceForm=this.initDeciveForm()
    this.clientFileId=this._activatedRoute.snapshot.queryParamMap.get('clientFileId')
    this.detailId=this._activatedRoute.snapshot.queryParamMap.get('detailId')
  }
  ngOnInit(): void {
    this.GetAllClients();
    this.LoadClientFileTopPage();
    this.GetTopById(this.detailId)
  }
  addTop(){

    let formData = new FormData();
    formData.append('ClientFileId',this.AddTopForm.get('ClientFileId')?.value)
    formData.append('TypeId',this.AddTopForm.get('TypeId')?.value)
    formData.append('TopColor',this.AddTopForm.get('TopColor')?.value)
    formData.append('PanelTypeId',this.AddTopForm.get('PanelTypeId')?.value)
    formData.append('TopHieght',this.AddTopForm.get('TopHieght')?.value)
    formData.append('SinkHoleId',this.AddTopForm.get('SinkHoleId')?.value)
    this.AddedDevices.forEach(device=>{
      formData.append('devices',JSON.stringify(device))
    })

    console.log(this.AddTopForm.value);
    if (this.detailId) {
      this.topService.UpdateTop(this.detailId,formData).subscribe(res=>{
        this.toastr.success("added")
        this._Router.navigateByUrl('/top')
      },err=>{
        this.toastr.error("not")
      })
    }else{
      this.topService.AddTop(formData).subscribe(res=>{
        this.toastr.success("added")
        this._Router.navigateByUrl('/top')
      },err=>{
        this.toastr.error("not")
      })
    }

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
 initClientForm():FormGroup{
  return this._FormBuilder.group({
    clientId: ['', [Validators.required]],
     phoneNumber: [null, [Validators.required]],
     clientAdress:[null,[Validators.required]]
  })
}
initDeciveForm():FormGroup{
  return this._FormBuilder.group({
    width:['', [Validators.required]],
    height:['', [Validators.required]],
    length:['', [Validators.required]],
    notes:['', [Validators.required]],
    attachmentPath:['', [Validators.required]],

  })
}
initTopForm(){
  return this._FormBuilder.group({
    FileNo:['',[Validators.required]],
    ClientFileId:['',[Validators.required]],
    TypeId:['',[Validators.required]],
    TopColor:['',[Validators.required]],
    PanelTypeId:['',[Validators.required]],
    TopHieght:['',[Validators.required]],
    SinkHoleId:['',[Validators.required]],
    Notes:['',[Validators.required]],
    devices: this._FormBuilder.array([]),
  })
}
GetAllClients() {
  this._ClientsService.GetAllClients().subscribe({
    next: (res: Clients) => {
      this.allClients = res.data
    }
  })
}
GetFileNo(clientId:any){
  this.topService.getFileNumber(clientId).subscribe((res:any)=>{
     this.allClientFileNO=res.data
     console.log(this.allClientFileNO);

   })
}
GetClientFileId(FileNo:any){
this.topService.getClietFileId(this.clientId,FileNo).subscribe((res:any)=>{
  this.AddTopForm.patchValue({
    ClientFileId:res.data.clientFileId
  })
})
}

LoadClientFileTopPage(){
  this.topService.LoadClientFileTopPage().subscribe((res:any)=>{
    console.log(res.data);
    this.allTopLists=res.data
  })
}
addDevice(){
this.AddedDevices.push(this.deviceForm.value)
console.log(this.AddedDevices);
this.deviceForm.reset()
this.uploadedImg = []
this.viewImg = []
}
deleteDevice(index:any){
  this.AddedDevices.splice(index,1)
  console.log(this.AddedDevices);
}
onImageSelected(event: any): void {
  this.viewImg = []
  this.uploadedImg = []
  if (event.target.files && event.target.files[0]) {
    this.deviceForm.get('attachmentPath')?.patchValue(event.target.files[0])
    const reader = new FileReader();
    this.uploadedImg.push(event.target.files.item(0));
    reader.onload = (event: any) => {
      this.viewImg.push(event.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
Getimage(index:any){
  let image =this.AddedDevices[index].attachmentPath

const reader = new FileReader();
    this.viewUploadedImageContent.push(image);
    reader.onload = (event: any) => {
      this.viewImageContent.push(event.target.result);
      this.ShowImage=this.viewImageContent[index]
    };
    console.log(this.viewImageContent);

    reader.readAsDataURL(image);
}
GetTopById(id:any){
this.topService.GetTopById(id).subscribe({next:(res:any)=>{
console.log(res)
this.clientForm.patchValue({
  clientId:res.data.client.clientId,
  phoneNumber:res.data.client.mobile
})
this.AddTopForm.patchValue({

  ClientFileId:this.clientFileId,
  TypeId:res.data.typeId,
  TopColor:res.data.topColor,
  TopHieght:res.data.topHieght,
  SinkHoleId:res.data.sinkHoleId,
  PanelTypeId:res.data.panelTypeId,
  notes:res.data.notes
})
this.AddedDevices = res.data.devices
},error:(err:any)=>{
  console.log("Error",err)
}})
}
}
