import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../clients/clients.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients } from '../../clients/modal/clients';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private _ClientsService:ClientsService,
              private _FormBuilder: FormBuilder,
              private _activatedRoute:ActivatedRoute,
              private toastr: ToastrService,
              private topService:TopService ){
    this.clientForm=this.initClientForm()
    this.AddTopForm=this.initTopForm()
    this.deviceForm=this.initDeciveForm()
    this.clientFileId=this._activatedRoute.snapshot.queryParamMap.get('clientFileId')
  }
  ngOnInit(): void {
    this.GetAllClients();
    this.LoadClientFileTopPage();
  }
  addTop(){
    const devicesArray = this.AddTopForm.get('devices') as FormArray;

    this.AddedDevices.forEach(device=>{

      devicesArray.push(

        this._FormBuilder.group({
        width:[device.width, [Validators.required]],
        height:[device.height, [Validators.required]],
        length:[device.length, [Validators.required]],
        notes:[device.notes, [Validators.required]],
        attachmentPath:[device.attachmentPath, [Validators.required]],

        })

      )
    })
    console.log(this.AddTopForm.value);
this.topService.AddTop(this.AddTopForm.value).subscribe(res=>{
  this.toastr.success("added")
},err=>{
  this.toastr.error("not")
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
}
