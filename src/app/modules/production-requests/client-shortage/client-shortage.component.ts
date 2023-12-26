import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductionRequestsService } from '../production-requests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-shortage',
  templateUrl: './client-shortage.component.html',
  styleUrls: ['./client-shortage.component.scss']
})
export class ClientShortageComponent implements OnInit {
  clientForm!:FormGroup
  clientFileId:any;
  shortageForm !: FormGroup;
  allShortage :any[]=[];
  constructor(private _FormBuilder : FormBuilder,
              private _activatedRoute:ActivatedRoute,
              private productionRequestService:ProductionRequestsService,
              private toastr:ToastrService) {
              this.clientFileId=this._activatedRoute.snapshot.queryParamMap.get('clientFileId')
              this.clientForm=this.initClientForm();
              this.shortageForm=this.initShortageForm();
  }
  ngOnInit(): void {
    this.getClientinfo();
    this.GetAllShortage();
  }
  addShortage(){
    this.shortageForm.get('clientFileId')?.patchValue(this.clientFileId)

      this.productionRequestService.AddShortage(this.shortageForm.value).subscribe({next:(res:any)=>{
        this.toastr.success(res.message)
      },error:(err=>{
        this.toastr.error(err.message)
      })})
      this.GetAllShortage();
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
  GetAllShortage(){
    this.productionRequestService.GetClientShortage(this.clientFileId).subscribe({next:(res:any)=>{
      this.allShortage=res.data;
    }})
  }
}
