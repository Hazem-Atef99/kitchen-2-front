import { environment } from 'src/environments/environment';
import { QuotationsService } from '../quotations/quotations.service';
import { FollowsService } from './follows.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from '../clients/clients.service';
import { Clients } from '../clients/modal/clients';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit {
  query: any = {
    PageType: 4,
    fileTypeId: 1,
  }
  allClients:any []=[];
  allfollows :any[]=[];
  statusCategoryById: any;
  statusId: any;
  viewImg: any[] = [];
  uploadedImg: any[] = [];
  Domain: any = environment.apiUrl;
  clientFileId: any;
  allClientFileAttachment: any[] = [];
  FilterForm!:FormGroup
  clientId: any;
  visible=false;
  constructor(private followsService:FollowsService,
              private _QuotationsService:QuotationsService,
              private toastr:ToastrService,
              private _ClientsService : ClientsService,
              private _FormBuilder : FormBuilder) {
                this.FilterForm=this.initFormFilter();

  }
  ngOnInit(): void {
   // this.GetAllFollowUp();
    console.log(this.handleDate(Date.now()));

  }
  addTop(){

  }
  getClientInfo(clientId:any){

  }
  filterbyClient(clientId : any){
    this.clientId=clientId
    this.FilterForm.get('clientId')?.patchValue(clientId)
  }
 FilterByStartDate(){
  //this.FilterForm.get('clientId')?.patchValue(this.clientId?this.clientId:EMPTY)
  var data;
  if (this.clientId) {
   data={
    clientId:this.FilterForm.get('clientId')?.value,
    startDate:this.FilterForm.get('startDate')?.value,
    endDate:this.FilterForm.get('endDate')?.value
  }
}else{
  data={
    //clientId:this.FilterForm.get('clientId')?.value,
    startDate:this.FilterForm.get('startDate')?.value,
    endDate:this.FilterForm.get('endDate')?.value
  }
}
    this.getFollows(data)
  }
  FilterByEndtDate(){
    var data;
    if (this.FilterForm.get('startDate')?.value) {

      if (this.FilterForm.get('clientId')?.value) {
        data={
         clientId:this.FilterForm.get('clientId')?.value,
         startDate:this.FilterForm.get('startDate')?.value,
         endDate:this.FilterForm.get('endDate')?.value
       }
     }else{
       data={
         //clientId:this.FilterForm.get('clientId')?.value,
         startDate:this.FilterForm.get('startDate')?.value,
         endDate:this.FilterForm.get('endDate')?.value
       }
     }
     this.getFollows(data)
    }
  }
  getFollows(data:any){
    this.followsService.GetFollowsByFilter(data).subscribe({next : (res:any)=>{
      console.log(res);
      this.allfollows=res.data;
     },error:(error:any)=>{
      this.toastr.error("no Records")
    }})
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
  initFormFilter():FormGroup{
return this._FormBuilder.group({
  clientId:['',],
  startDate:['',],
  endDate:[this.handleDate(Date.now()),]
})
  }
  filter(event: any) {
    console.log(event.value);
    event.value ? this.query['fileTypeId'] = event.value : this.query['fileTypeId'] = null;
   //  this.GetAllFollowUp();
  }
  // GetAllFollowUp(){
  //   this.followsService.GetAllFollows().subscribe({next:(res:any)=>{
  //     this.allfollows=res.data

  //   }})
  // }
  GetStatusCategoryById() {
    this._QuotationsService.GetStatusCategoryById(100).subscribe({
      next: (res: any) => {
        this.statusCategoryById = res.data
        console.log()
        this.statusId = res.data.statuses[0].statusId
      }
    })
  }
  GetAllClients() {
    this._ClientsService.GetAllClients().subscribe({
      next: (res: Clients) => {
        this.allClients = res.data
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
    this.followsService.AddFollowAttachment(this.clientFileId,value).subscribe({
      next: (res: any) => {
        this.toastr.success(`${res.message}`);
        this.viewImg = []
        this.uploadedImg = []
        this.GetAllClientFileAttachment()
       // this.GetShortClientFiles();
       this.visible=false;
      }, error: (err: any) => {
        this.toastr.error(`${err.message}`);
        this.visible=true;
      }
    })
  }
  GetAllClientFileAttachment() {
    let query = {
      clientFileId: this.clientFileId,
      statusId: this.statusId,
    }
    this.followsService.GetAllFollows(this.clientFileId).subscribe({
      next: (res: any) => {
        this.allClientFileAttachment = res.data
      }
    })
  }
}
