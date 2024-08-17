import { ToastrService } from 'ngx-toastr';
import { ClientPaymentService } from './../client-payment.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients, DataClients } from '../../clients/modal/clients';
import { ClientsService } from '../../clients/clients.service';
import { ContractService } from '../../contract/contract.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent {
  clientForm! :FormGroup;
  allClients: DataClients[] = [];
  allUsers:any[] = [];
  paymentType=[
    {id:0,
      name:'Cash'
    },
    {id:1,
      name:'Cheque'
    }
  ]
  payType: number=0;
  constructor(private _FormBuilder: FormBuilder,
              private _ClientsService:ClientsService,
              private _ClientPaymentService:ClientPaymentService,
              private _ConttactService:ContractService,
              private toastr:ToastrService) {

    this.clientForm=this.initClientForm()
  }
  ngOnInit(): void {
    this.GetAllClients()
    this.getAllUsers()
  }
  initClientForm():FormGroup{
    return this._FormBuilder.group({
      clientId: ['', [Validators.required]],
      paied: [null, [Validators.required]],
       total:[null,[Validators.required]],
       remaining:[null,[Validators.required]],
       paymentDate:[null,[Validators.required]],
       noOfDoc:[null,Validators.required],
       amount:[null,Validators.required],
       notes:[null,Validators.required],
       paidTypeId:[null,Validators.required],
       drawer:[null,Validators.required],
       checkDate:[null,Validators.required],
       checkNo:[null,Validators.required],
       salesId:[null,Validators.required]
    })
  }
  GetAllClients() {
    this._ClientsService.GetAllClients().subscribe({
      next: (res: Clients) => {
        this.allClients = res.data
      }
    })
  }
  deterPaymentType(){
    if(this.clientForm.get('paidTypeId')?.value ==0){
      this.payType=0
      }else{
        this.payType=1;
      }

  }
  getpaymentClient(){
    let clientId =this.clientForm.get('clientId')?.value
    console.log(clientId);

    this._ClientPaymentService.getClientPayment(clientId).subscribe((res:any)=>{
      let ClientPaymentInfo = res.data

      this.clientForm.patchValue({
        paied:ClientPaymentInfo.paied,
        total:ClientPaymentInfo.amount,
        remaining:ClientPaymentInfo.remaining
      })
    },err=>{
      this.clientForm.patchValue({
        paied:null,
        total:null,
        remaining:null
      })
    })
  }
  getAllUsers(){
    this._ConttactService.GetAllUsersApi().subscribe(res=>{
      this.allUsers = res.data
  })}
  AddClientPayment(){
    let data={
      clientId:this.clientForm.get('clientId')?.value,
      amount:this.clientForm.get('amount')?.value,
      paymentDate:this.clientForm.get('paymentDate')?.value,
      paidTypeId:this.clientForm.get('paidTypeId')?.value,
      notes:this.clientForm.get('notes')?.value,
      checkNo:this.payType==1?this.clientForm.get('checkNo')?.value:null,
      checkDate:this.payType==1?this.clientForm.get('checkDate')?.value:null
    }
    this._ClientPaymentService.AddClientPayment(data).subscribe(
      //next:
       (res: any) => {
        if (res.message) {
          this.toastr.error(res.message)
        }else{
          this.toastr.success('تم اضافة المستند');
          console.log('Response:', res);
        }

      },
       (err: any) => {
        console.log('Error:', err);
        if (err.message) {
          this.toastr.error(err.message);
        } else {
          this.toastr.error('An unknown error occurred.');
        }
      }
    );
  }

}
