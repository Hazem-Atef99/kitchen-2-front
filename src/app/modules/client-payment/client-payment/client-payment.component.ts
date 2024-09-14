import { ToastrService } from 'ngx-toastr';
import { ClientPaymentService } from './../client-payment.service';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients, DataClients } from '../../clients/modal/clients';
import { ClientsService } from '../../clients/clients.service';
import { ContractService } from '../../contract/contract.service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent {

  @ViewChild('successModal') successModal!: TemplateRef<any>; // Get reference to the modal template
  documentNumber: string = '';
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
              private _Router:Router,
              private toastr:ToastrService,
              private modalService: NgbModal) {

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
       paymentDate:[this.handleDate(Date.now()),[Validators.required]],
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
  handleDate(date:any){
    let year, month, day;
     let Fdate = new Date(date).toLocaleString().split(',')[0]
    year = Fdate.split('/')[2]
    month = Fdate.split('/')[0]
    day = Fdate.split('/')[1]
    let newDate = (year)+'-'+(+month < 10 ? '0'+month : month )+'-'+(+day < 10 ? '0'+day : day )
    return newDate;
  }
  AddClientPayment(){
    let data={
      clientId:this.clientForm.get('clientId')?.value,
      amount:this.clientForm.get('amount')?.value,
      paymentDate:this.clientForm.get('paymentDate')?.value,
      paidTypeId:this.clientForm.get('paidTypeId')?.value,
      notes:this.clientForm.get('notes')?.value,
      checkNo:this.payType==1?this.clientForm.get('checkNo')?.value:null,
      checkDate:this.payType==1?this.clientForm.get('checkDate')?.value:null,
      saleId:this.clientForm.get('salesId')?.value
    }
    this._ClientPaymentService.AddClientPayment(data).subscribe(
      //next:
       (res: any) => {
        if (res.message!="Sucssed") {
          this.toastr.error(res.message)
        }else{

          this.toastr.success('تم اضافة المستند');
          this.documentNumber=res.data;
          this.modalService.open(this.successModal);
          this._Router.navigateByUrl('/home')
          console.log('Response:', res);
        }

      },
       (err: any) => {
        console.log('Error:', err);
        if (err.message) {
          this.toastr.error(err.message);
        } else {
          this.toastr.error(`${err.errors[0]}`);
        }
      }
    );
  }


}
