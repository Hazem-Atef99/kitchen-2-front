import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients, DataClients } from '../../clients/modal/clients';
import { ClientsService } from '../../clients/clients.service';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from '../../contract/contract.service';
import { ActivatedRoute } from '@angular/router';
import { ReceptionReportService } from '../reception-report.service';

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
  devices:any[]=[];
  // devices :any=[
  //   {
  //     name:'Fridge 60',
  //     id:1
  //   },
  //   {
  //     name:'Fridge 90',
  //     id:1
  //   },
  //   {
  //     name:'Freezer 60',
  //     id:1
  //   },
  //   {
  //     name:'Freezer 90',
  //     id:1
  //   },
  //   {
  //     name:'Oven 60',
  //     id:1
  //   },
  //   {
  //     name:'Oven 90',
  //     id:1
  //   },
  //   {
  //     name:'Hop',
  //     id:1
  //   },
  //   {
  //     name:'Warming Drawer',
  //     id:1
  //   },
  //   {
  //     name:'Microwave',
  //     id:1
  //   },
  //   {
  //     name:'Cofee Maker',
  //     id:1
  //   },
  //   {
  //     name:'Cooler',
  //     id:1
  //   },
  //   {
  //     name:'Dish Washer',
  //     id:1
  //   },
  //   {
  //     name:'Washing Machine',
  //     id:1
  //   },

  // ]
  KitchenType:any[]=[]
  MyDevices: any[]=[];
  constructor(private _FormBuilder: FormBuilder,
              private recptionReportService:ReceptionReportService,
              private _ClientsService: ClientsService,
              private toastr: ToastrService,
              private _activatedRoute: ActivatedRoute,
              private _ConttactService:ContractService) {
    this.AddClientFileForm = this.initClientFileForm();
    this.clientForm=this.initClientForm()
  }
  ngOnInit(): void {
    let fileTypeId: any = this._activatedRoute.snapshot.queryParamMap.get('fileTypeId')
    this.GetAllClients();
    this.GetDevices();
    this.GetKitchenType();
    this.fileTypeId = +fileTypeId
    if (fileTypeId) {
      this.AddClientFileForm.patchValue({
        fileTypeId: +fileTypeId
      });
    }
  }

  AddClientFile(){
    console.log(this.AddClientFileForm.value);
    let val1, val2
    val1 = this.AddClientFileForm.get('measurementId')?.value
    val2 = val1.toString()
    console.log(val2)
    this.AddClientFileForm.patchValue({
      measurmentId: val2
    })
    this.recptionReportService.AddUpdatereceptionReport(this.AddClientFileForm.value).subscribe(res=>{
this.toastr.success("added")
    },err=>{
      this.toastr.error("not")
    })


  }
  GetAllClients() {
    this._ClientsService.GetAllClients().subscribe({
      next: (res: Clients) => {
        this.allClients = res.data
      }
    })
  }
  GetDevices(){
this._ConttactService.GetStatusCategoryById(19).subscribe(res=>{
  this.devices=res.data.statuses
  console.log(this.devices);

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
      clientId: [1, [Validators.required]],
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
      salesId:[null,Validators.required]

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
AddDevice() {
  this.MyDevices.push(
    this.devices.filter((ele: any) => ele.id === this.AddClientFileForm.get('devices')?.value)[0]
  )
  console.log(this.MyDevices)
  this.alldevices?.value.push(
    {deviceId: this.AddClientFileForm.get('devices')?.value}
  )
  this.AddClientFileForm.controls['devices'].patchValue(this.alldevices)
}
DeleteDevice(i: number) {
  this.MyDevices.splice(i, 1);
  this.alldevices?.get('deviceId')?.value.splice(i, 1);
  console.log(this.MyDevices)
  console.log(this.device)
}
get alldevices() {
  return this.AddClientFileForm.get('devices')
}
get device() {
  return this.alldevices?.get('deviceId')?.value
}
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
}
