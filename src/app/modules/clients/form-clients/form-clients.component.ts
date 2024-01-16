import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss']
})
export class FormClientsComponent implements OnInit{
  clientId:any;
  clientsForm!:FormGroup;
  mobile:string="";
  constructor(private fb :FormBuilder,
              private clientService:ClientsService,
              private toastr:ToastrService,
              private _activatedRoute:ActivatedRoute,
              ) {
                this.clientId=this._activatedRoute.snapshot.queryParamMap.get('clientId');
    this.clientsForm=this.initClientForm();
  }
  ngOnInit(): void {
    if (this.clientId) {
      this.getClient(this.clientId);
    }
  }
  addClient(){
     this.mobile=this.clientsForm.get('mobile')?.value;
     this.mobile=this.mobile.toString();
     this.clientsForm.get('mobile')?.patchValue(this.mobile)
    if(this.clientId){
      this.clientsForm.get('')?.patchValue(this.clientId)
      this.clientService.UpdateClient(this.clientId, this.clientsForm.value).subscribe({next:(res:any)=>{
        this.toastr.success("تم تعديل الزبون");
      },error:(err=>{
        this.toastr.error("حدث خطأ");
      })});
    }else{
      this.clientService.AddClient(this.clientsForm.value).subscribe({next:(res:any)=>{
        this.toastr.success("تم اضافة الزبون");
      },error:(err=>{
        this.toastr.error("حدث خطأ");
      })});
    }

  }
  initClientForm():FormGroup{
    return this.fb.group({

      clientName: ['',],
      email: ['',],
      fax: ['',],
      mobile: ['',],
      tel1: ['',],
      clientAddress: ['',]
    });
  }
  getClient(id:any){
    this.clientService.GetClient(id).subscribe({next:(res:any)=>{
      this.clientsForm.patchValue({
        clientName: res.data[0].clientName,
        email: res.data[0].email,
        fax: res.data[0].fax,
        mobile: res.data[0].mobile,
        tel1: res.data[0].tel1,
        clientAddress: res.data[0].clientAddress
      });
    }});
  }
}
