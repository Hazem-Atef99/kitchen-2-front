import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductionRequestsService } from '../production-requests.service';
import { ToastrService } from 'ngx-toastr';
import { QuotationsService } from '../../quotations/quotations.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-shortage',
  templateUrl: './client-shortage.component.html',
  styleUrls: ['./client-shortage.component.scss']
})
export class ClientShortageComponent implements OnInit {
  clientForm!:FormGroup
  clientFileId:any;
  shortageForm !: FormGroup;
  detailsForm!:FormGroup;
  allShortage :any[]=[];
  statusCategoryById: any;
  statusId: any;
  viewImg: any[] = [];
  uploadedImg: any[] = [];
  clientShortageDetails:any[]=[];
  allClientFileAttachment: any[] = [];
  Domain: any = environment.apiUrl;
  clientShortageId: any;
  itemCount:string='';
  constructor(private _FormBuilder : FormBuilder,
              private _activatedRoute:ActivatedRoute,
              private productionRequestService:ProductionRequestsService,
              private toastr:ToastrService,
              private _QuotationsService:QuotationsService,
              private location: Location) {
              this.clientFileId=this._activatedRoute.snapshot.queryParamMap.get('clientFileId')
              this.clientForm=this.initClientForm();
              this.shortageForm=this.initShortageForm();
              this.detailsForm=this.initDetailForm();
  }

  ngOnInit(): void {
    this.getClientinfo();
    this.GetAllShortage();
    this.GetStatusCategoryById()
  }
  addShortage(){
    this.shortageForm.get('clientFileId')?.patchValue(this.clientFileId)

      this.productionRequestService.AddShortage(this.shortageForm.value).subscribe({next:(res:any)=>{
        this.shortageForm.patchValue({
      tarkeebDate:'',
      notes:''

        })
        this.toastr.success(res.message)
        this.GetAllShortage();
      },error:(err=>{
        this.toastr.error(err.message)
      })})

  }
  initDetailForm():FormGroup{
    return this._FormBuilder.group({
      clientShortageId: ['', ],
      internalColor: ['', ],
      subColor: ['', ],
      tarkeebBy: ['', ],
      bayan: ['', ],
      hieght: ['', ],
      width: ['', ],
      itemCount: ['', ],
      qshatColor: ['', ],
      notes: ['', ]
    })
  }
  GetStatusCategoryById() {
    this._QuotationsService.GetStatusCategoryById(100).subscribe({
      next: (res: any) => {
        this.statusCategoryById = res.data
        console.log()
        this.statusId = res.data.statuses[0].statusId
      }
    })
  }
  initClientForm():FormGroup{
    return this._FormBuilder.group({
      clientId: ['', ],
       phoneNumber: [null, ],
       clientAdress:[null,],
       clientFileTypeId:[null,]
    })
  }
  initShortageForm(){
    return this._FormBuilder.group({
      notes:['', Validators.required],
      tarkeebDate:['', Validators.required],
      clientFileId:['', Validators.required]
    })
  }
  getClientinfo(){
    this.productionRequestService.GetProductionRequestsByIdApi(this.clientFileId).subscribe({next: (res:any)=>{
      this.clientForm.patchValue({
        clientId:res.data.client.clientName,
        phoneNumber:res.data.client.mobile,
        clientAdress:res.data.client.address,
        clientFileTypeId:res.data.fileTypeId
      })
    }})
  }
  GetAllShortageDetails(id:any){
    console.log("id",id);
    this.clientShortageId=id
    this.productionRequestService.GetClientShortagedetails(id).subscribe({next : (res:any)=>{
      this.clientShortageDetails=res.data;
    }})

  }
  GetAllShortage(){
    this.productionRequestService.GetClientShortage(this.clientFileId).subscribe({next:(res:any)=>{
      this.allShortage=res.data;
    }})
  }
  deleteDetailRow(id:any){
    this.productionRequestService.deleteClientShortageDetail(id).subscribe({next:(res:any)=>{
      this.toastr.success("تم حذف التفاصيل")
      this.GetAllShortageDetails(this.clientShortageId)
    },
    error:(err:any)=>{
      this.toastr.error("حدث خطأ")
    }
  })
  }
  deleteClientShortage(id:any){
    this.productionRequestService.deleteClientShortage(id).subscribe({next:(res:any)=>{
      this.toastr.success("تم الحذف ")
      this.GetAllShortage();
    },
    error:(err:any)=>{
      this.toastr.error("حدث خطأ")
    }
  })
  }
  AddDetail(){
     this.itemCount=this.detailsForm.get('itemCount')?.value
      this.itemCount=this.itemCount.toString();
    this.detailsForm.get('clientShortageId')?.patchValue(this.clientShortageId);
    this.detailsForm.get('itemCount')?.patchValue(this.itemCount)
    console.log(this.detailsForm.value);
    this.productionRequestService.AddClientShortagedetails(this.detailsForm.value).subscribe({next:(res:any)=>{
      this.toastr.success("تم اضافة التفاصيل")
      this.detailsForm.patchValue({
        bayan:'',
        hieght:'',
        width:'',
        itemCount:'',
        qshatColor:'',
        notes:''
      });
      this.GetAllShortageDetails(this.clientShortageId)
    },
    error:(err:any)=>{
      this.toastr.error("حدث خطأ")
    }
  })
  }
  onImageSelected(event: any): void {
    this.viewImg = []
    this.uploadedImg = []
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.uploadedImg.push(event.target.files.item(0));
      reader.onload = (event: any) => {
        this.viewImg.push(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  AddClientFileAttachment() {
    let value: any = {};
    value['clientFileId'] = this.clientFileId;
    value['attachmentPath'] = this.uploadedImg[0];
    value['statusId'] = this.statusId;
    this._QuotationsService.AddClientFileAttachment(value).subscribe({
      next: (res: any) => {
        this.toastr.success(`${res.message}`);
        this.viewImg = []
        this.uploadedImg = []
        this.GetAllClientFileAttachment()
       // this.GetShortClientFiles();
      }, error: (err: any) => {
        this.toastr.error(`${err.message}`);
      }
    })
  }
  DeleteClientFileAttachment(AtthachmentId:any){
    let data={
      "clientFileId":this.clientFileId,
      "attachmentId":AtthachmentId
    }
    this._QuotationsService.DeleteClientFileAttachment(data).subscribe({
      next: (res: any) => {
        this.toastr.success("تم مسح المرفق")
        this.GetAllClientFileAttachment()
      },
      error: (err: any) => {
        this.toastr.error("حدث خطأ أثناء حذف المرفق")
      }
    })
}
  GetAllClientFileAttachment() {
    let query = {
      clientFileId: this.clientFileId,
      statusId: this.statusId,
    }
    this._QuotationsService.GetAllClientFileAttachment(query).subscribe({
      next: (res: any) => {
        this.allClientFileAttachment = res.data
      }
    })
  }
}
