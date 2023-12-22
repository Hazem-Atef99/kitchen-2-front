import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../clients/clients.service';
import { Clients } from '../../clients/modal/clients';
import { TopService } from '../../top/top.service';
import { FollowsService } from '../follows.service';
import { ActivatedRoute } from '@angular/router';
import { QuotationsService } from '../../quotations/quotations.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-follows',
  templateUrl: './form-follows.component.html',
  styleUrls: ['./form-follows.component.scss']
})
export class FormFollowsComponent implements OnInit {
  clientFileId:any;
  clientForm!:FormGroup;
  addFollowForm!:FormGroup;
  allClients : any[]=[];
  clientId: any;
  allClientFileNO : any[]=[];
  viewImg: any[] = [];
  uploadedImg: any[] = [];
  Follows: any[] = [];
  allClientFileAttachment: any[] = [];
  statusCategoryById: any;
  statusId: any;
  Domain: any = environment.apiUrl;
  FollowId:any;
  constructor(private _FormBuilder:FormBuilder,
              private _ClientsService:ClientsService,
              private topService:TopService,
              private followService:FollowsService,
              private _activatedRoute:ActivatedRoute,
              private _QuotationsService:QuotationsService,
              private toastr:ToastrService) {
this.clientForm=this.initClientForm();
this.addFollowForm=this.initFollowForm();
this.clientFileId=this._activatedRoute.snapshot.queryParamMap.get('clientFileId')
this.FollowId=this._activatedRoute.snapshot.queryParamMap.get('FollowId')
  }
  ngOnInit(): void {
    this.GetAllClients()
    if(this.FollowId){
      this.GetFollowById();
    }
    if(this.clientFileId){
      this.GetFollows();
    }
    this.GetStatusCategoryById()

  }
  addFollow(){
    // this.addFollowForm.get('Id')?.patchValue(this.clientFileId)
    this.addFollowForm.get('Attachment')?.patchValue(this.uploadedImg[0])
    console.log('Attachment',this.addFollowForm.get('Attachment')?.value);

    this.followService.AddFollow(this.addFollowForm.value).subscribe({next:(res:any)=>{
      this.toastr.success('Added')
      this.GetFollows();
    },
  error:(err:any)=>{
    this.toastr.error('Not Added')
  }})
  }
  GetFollows(){
    this.followService.GetAllFollows(this.clientFileId).subscribe({next:(res:any)=>{
      this.Follows = res.data
    }})
  }
  initClientForm():FormGroup{
    return this._FormBuilder.group({
      clientId: ['', [Validators.required]],
       phoneNumber: [null, [Validators.required]],
       clientAdress:[null,[Validators.required]]
    })
  }
  initFollowForm():FormGroup{
    return this._FormBuilder.group({
      Id: ['', [Validators.required]],
      Attachment: [null, [Validators.required]],
      Note:[null,[Validators.required]],
      FileNo:['', ]
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
     console.log(this.allClientFileNO);

   })
}
GetClientFileId(FileNo:any){
  this.topService.getClietFileId(this.clientId,FileNo).subscribe((res:any)=>{
    this.addFollowForm.patchValue({
      Id:res.data.clientFileId
    })
   // this.clientFileId=res.data.clientFileId;
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
    console.log( this.uploadedImg[0]);

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
  GetStatusCategoryById() {
    this._QuotationsService.GetStatusCategoryById(100).subscribe({
      next: (res: any) => {
        this.statusCategoryById = res.data
        console.log()
        this.statusId = res.data.statuses[0].statusId
      }
    })
  }
  GetFollowById(){
    this.followService.GetFollowDetails(this.FollowId).subscribe({next:(res:any)=>{
      console.log(res.data);

      this.clientForm.get('clientId')?.patchValue(res.data.client.clientId)
      this.addFollowForm.get('FileNo')?.patchValue(res.data.fileNo)
    }})
  }
  addDetailFollow(){
    // let Data={
    //   Id: this.clientFileId,
    //   Attachment: this.addFollowForm.get('Attachment')?.value,
    //   Note:this.addFollowForm.get('Note')?.value
    // }
    this.addFollowForm.get('Id')?.patchValue(this.clientFileId)
    this.addFollowForm.get('Attachment')?.patchValue(this.uploadedImg[0])
    this.followService.AddFollow(this.addFollowForm.value).subscribe({next:(res:any)=>{
      this.toastr.success('Added')
      this.GetFollows();
    },
  error:(err:any)=>{
    this.toastr.error('Not Added')
  }})
  }

}
