import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients, DataClients } from '../../clients/modal/clients';
import { ClientsService } from '../../clients/clients.service';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from '../../contract/contract.service';
import { ActivatedRoute } from '@angular/router';
import { ReceptionReportService } from '../reception-report.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-form-reception-report',
  templateUrl: './form-reception-report.component.html',
  styleUrls: ['./form-reception-report.component.scss']
})
export class FormReceptionReportComponent {
  clientFileId:any;
  AddClientFileForm!: FormGroup;
  clientForm! :FormGroup;
  fileTypeId: any;
  allClients: DataClients[] = [];
  selectedOptions: any[] = [];
  dataToPatch:any[]=[];

  AMorPM=[
    {
      name:'AM',
      id:1
    },
    {
      name:'PM',
      id:2
    }

  ];
  clientFileTypes: any = [
    {
      name: 'المطابخ',
      id: 1
    },
    {
      name: 'الابواب',
      id: 2
    },
    {
      name: 'خزائن الحائط',
      id: 4
    },
    {
      name: 'الاعمال الخشبية',
      id: 6
    },
  ]

  KitchenType:any[]=[]
  MyDevices: any[]=[];
  users: any;
  Alldevices: any;
  actionByHour=0;
  constructor(private _FormBuilder: FormBuilder,
              private recptionReportService:ReceptionReportService,
              private _ClientsService: ClientsService,
              private toastr: ToastrService,
              private _activatedRoute: ActivatedRoute,
              private _ConttactService:ContractService) {
                this.clientFileId=this._activatedRoute.snapshot.queryParamMap.get('clientFileId')
    this.AddClientFileForm = this.initClientFileForm();
    this.clientForm=this.initClientForm()
  }
  ngOnInit(): void {
    let fileTypeId: any = this._activatedRoute.snapshot.queryParamMap.get('fileTypeId')
    console.log(this.clientFileId);

    this.GetAllClients();
    this.GetDevices();
    this.GetKitchenType();
    this.getAllUsers()
    if(this.clientFileId){
      this.getReceptionReportById(this.clientFileId)
    }

    this.fileTypeId = +fileTypeId
    if (fileTypeId) {
      this.AddClientFileForm.patchValue({
        fileTypeId: +fileTypeId
      });
    }
  }
  getActionByHour(){
    this.actionByHour=parseInt(this.AddClientFileForm.get('actionByHour')?.value);
  }
  change(event:any){
    this.AMorPM=event;
    console.log(event);
    //this.actionByHour=parseInt(this.AddClientFileForm.get('actionByHour')?.value);
    this.actionByHour=event==2?this.actionByHour+12:this.actionByHour;
    console.log('action by hour',parseInt(this.AddClientFileForm.get('actionByHour')?.value));

  }
  AddClientFile(){
    let val1, val2
    val1 = this.AddClientFileForm.controls['measurmentId']?.value
    val2 = val1.toString()
    console.log(val2)
    if(this.clientFileId!=null){

      this.AddClientFileForm.get('clientFileId')?.patchValue(this.clientFileId)
    }

    this.AddClientFileForm.patchValue({
      measurmentId: val2
    })
    this.AddClientFileForm.patchValue({
      clientId:this.clientForm.get('clientId')?.value
    })
    console.log(this.AddClientFileForm.get('devices')?.value)
    // this.AddClientFileForm.get('devices')?.reset();
    const devicesArray = this.AddClientFileForm.get('devices') as FormArray;

    this.selectedOptions.forEach(device=>{

      devicesArray.push(
        this._FormBuilder.group({
          deviceId: [device, Validators.required],
        })
      )
    })
    console.log(this.AddClientFileForm.value);

    this.AddClientFileForm.get('actionByHour')?.patchValue(this.actionByHour);
    this.recptionReportService.AddUpdatereceptionReport(this.AddClientFileForm.value).subscribe(res=>{
this.toastr.success("added")
this.getReceptionReportById(this.clientFileId)
    },err=>{
      this.toastr.error("not")
      this.AddClientFileForm.get('actionByHour')?.patchValue(this.AddClientFileForm.get('AMorPM')?.value==2?this.actionByHour-12:this.actionByHour);
    })


  }
  GetAllClients() {
    this._ClientsService.GetAllClients().subscribe({
      next: (res: Clients) => {
        this.allClients = res.data
      }
    })
  }
  getClientInfo(clientId:any){

     console.log(clientId);
if (clientId) {
  this._ClientsService.GetClient(clientId).subscribe((res:any)=>{
    console.log(res);

    this.clientForm.patchValue({

      phoneNumber:res.data[0].mobile,
      clientAdress:res.data[0].clientAddress
    })
  })
}
  }
  GetDevices(){
this._ConttactService.GetStatusCategoryById(19).subscribe(res=>{
  this.Alldevices=res.data.statuses
  console.log(this.Alldevices);

})
  }
  GetKitchenType(){
    this._ConttactService.GetStatusCategoryById(18).subscribe(res=>{
      this.KitchenType=res.data.statuses
    })
  }
  initClientForm():FormGroup{
    return this._FormBuilder.group({
      clientId: ['', [Validators.required]],
       phoneNumber: [null, [Validators.required]],
       clientAdress:[null,[Validators.required]]
    })
  }
  initClientFileForm(): FormGroup {
    return this._FormBuilder.group({
      clientFileId: [null, [Validators.required]],
      clientId: [null, [Validators.required]],
      fileDate: [null, [Validators.required]],
      actionByHour: ['', [Validators.required]],
      clientNeed: [null, [Validators.required]],
      designerId: [null, [Validators.required]],
      designerDate: [null, [Validators.required]],
      measurmentDate: [null, [Validators.required]],
      measurmentId: [null, [Validators.required]],
      kitchenModelId: [null, [Validators.required]],
      kitchenLocation: [null, [Validators.required]],
      devices: this._FormBuilder.array([]),
      selectedDevice:[null, [Validators.required]],
      salesId:[null,Validators.required],
      AMorPM:['AM',Validators.required]

})
}
setMeasurement() {
  let val1, val2
  val1 = this.AddClientFileForm.get('measurmentId')?.value
  console.log(val1)
  val2 = val1.toString()
  console.log(val2)
  this.AddClientFileForm.patchValue({
    measurmentId: val2
  })
}
// AddDevice() {
//   this.MyDevices.push(
//     this.devices.filter((ele: any) => ele.id === this.AddClientFileForm.get('devices')?.value)[0]
//   )
//   console.log(this.MyDevices)
//   this.alldevices?.value.push(
//     {deviceId: this.AddClientFileForm.get('devices')?.value}
//   )
//   this.AddClientFileForm.controls['devices'].patchValue(this.alldevices)
// }
// DeleteDevice(i: number) {
//   this.MyDevices.splice(i, 1);
//   this.alldevices?.get('deviceId')?.value.splice(i, 1);
//   console.log(this.MyDevices)
//   console.log(this.device)
// }
// get alldevices() {
//   return this.AddClientFileForm.get('devices')
// }
// get device() {
//   return this.alldevices?.get('deviceId')?.value
// }
AddNotice() {
  let value: any = this.AddClientFileForm.value;
  value['clientFileId'] = this.clientFileId
  this.recptionReportService.AddUpdatereceptionReport(value).subscribe({
    next: (res: any) => {
      this.toastr.success(`${res.message}`);

      location.reload()
    }, error: (err: any) => {
      this.toastr.error(`${err.message}`);
    }
  })
}
getAllUsers(){
  this._ConttactService.GetAllUsersApi().subscribe(res=>{
    this.users = res.data
  })
}
isSelected(statusId: number): boolean {
  return this.selectedOptions.includes(statusId);
}
getReceptionReportById(clientFileId:any){

  this.recptionReportService.GetReceptionReportById(clientFileId).subscribe((res:any)=>{
    let receptionReport=res.data;
     this.dataToPatch = res.data.devices; // Replace this with actual data
    this.dataToPatch.forEach(device=>{
      this.selectedOptions.push(device.id)
    })

    console.log(this.selectedOptions);


    this.AddClientFileForm.patchValue({
      // clientId:receptionReport
      actionByHour:receptionReport.actionByHour,
      designerId:receptionReport.designerId,
      designerDate:this.handleDate(receptionReport.designerDate),
      measurmentId:receptionReport.measurmentid,
      measurmentDate:this.handleDate(receptionReport.measurmentDate),
      salesId:receptionReport.salesId,
      kitchenLocation:receptionReport.kitchenLocation,
      fileDate:this.handleDate(receptionReport.fileDate),
      kitchenModelId:receptionReport.kitchecnModelId,
      clientNeed:receptionReport.clientNeed,


    })
    this.clientForm.patchValue({
      clientId:receptionReport.client.clientId,
      phoneNumber:receptionReport.client.mobile,
      clientAdress:receptionReport.client.clientAddress
    })


  })
}
handleDate(date:any){
  let year, month, day;
   let Fdate = new Date(date).toLocaleString().split(',')[0]
  year = Fdate.split('/')[2]
  month = Fdate.split('/')[0]
  day = Fdate.split('/')[1]
  let newDate = (year)+'-'+(+month < 10 ? '0'+month : month )+'-'+(+day < 10 ? '0'+day : day )
  return newDate;
}
selectOption(event:any,option:any){
  const isChecked = event.target.checked;

  if (isChecked) {
    // Add the option to the selectedOptions array
    if (this.selectedOptions.indexOf(option.statusId) === -1) {
      this.selectedOptions.push(option.statusId);
    }
  } else {
    // Remove the option from the selectedOptions array
    const index = this.selectedOptions.indexOf(option.statusId);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);

}
}
console.log(this.selectedOptions);
}}





