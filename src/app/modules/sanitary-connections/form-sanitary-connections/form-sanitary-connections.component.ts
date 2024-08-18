import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../clients/clients.service';
import { TopService } from '../../top/top.service';
import { Clients } from '../../clients/modal/clients';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { SanitaryConnectionsService } from '../sanitary-connections.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-sanitary-connections',
  templateUrl: './form-sanitary-connections.component.html',
  styleUrls: ['./form-sanitary-connections.component.scss']
})
export class FormSanitaryConnectionsComponent implements OnInit {
  ID :any;
  AddSanitaryConnectionsForm!:FormGroup;
  clientForm!:FormGroup;
  clientId: any;
  allClientFileNO : any[]=[];
  allClients: any[]=[];
  points:any[]=[];
 viewImg :any[]=[];
  uploadedImg :any[]=[];
  sanitaryConnections:any[]=[];
  clientFileId: string | null;
  constructor(private formBuilder : FormBuilder,
              private _ClientsService:ClientsService,
              private topService:TopService,
              private _activatedRoute:ActivatedRoute,
              private _Router:Router,
              private sanitaryConnectionService:SanitaryConnectionsService,
              private toastr:ToastrService) {
                this.AddSanitaryConnectionsForm=this.initSanitaryConnectionsForm();
                this.clientForm=this.initClientForm();
                this.ID=this._activatedRoute.snapshot.queryParamMap.get('ID')
                this.clientFileId=this._activatedRoute.snapshot.queryParamMap.get('clientFileId')

  }

  ngOnInit(): void {
    this.GetAllClients();
    if (this.ID) {
     this.GetSanitaryConnectionById(this.ID);
    }
    this.getPoints();
  }

  addSanitaryConnection(){
    let data= new FormData()
    data.append('clientId',this.AddSanitaryConnectionsForm.get('clientId')?.value)
    data.append('FileNo',this.AddSanitaryConnectionsForm.get('FileNo')?.value)
    data.append('PointId',this.AddSanitaryConnectionsForm.get('PointId')?.value)
    data.append('Notes',this.AddSanitaryConnectionsForm.get('Notes')?.value)
    data.append('Attachement',this.AddSanitaryConnectionsForm.get('Attachement')?.value)
    data.append('TarkeebDate',this.handleDate(this.AddSanitaryConnectionsForm.get('TarkeebDate')?.value))
    data.append('KitchenHeight',this.AddSanitaryConnectionsForm.get('KitchenHeight')?.value)


      this.sanitaryConnectionService.AddSanitaryConnection(data).subscribe({next:(res:any)=>{
        this.toastr.success("تم الاضافة")
        this.viewImg = []
        this.uploadedImg = []
        this.AddSanitaryConnectionsForm.patchValue({
          PointId:'',
          KitchenHeight:'',
          TarkeebDate:'',
          Attachement:'',
          Notes:''

        })
        //this._Router.navigateByUrl('/sanitaryConnections')
        this.GetAllSanitaryConnectionsByClientAndFileNo(this.AddSanitaryConnectionsForm.get('clientId')?.value,this.AddSanitaryConnectionsForm.get('FileNo')?.value)
      },error:(err:any)=>{
        this.toastr.error("حدث خطأ")
      }})


  }
  initSanitaryConnectionsForm():FormGroup{
    return this.formBuilder.group({
      clientId: ['', [Validators.required]],
      FileNo:['',[Validators.required]],
      PointId:['',[Validators.required]],
      KitchenHeight:['',[Validators.required]],
      TarkeebDate:['',[Validators.required]],
      Attachement:['',[Validators.required]],
      Notes:['',[Validators.required]],
    })
  }
  initClientForm():FormGroup{
    return this.formBuilder.group({
      clientId: ['', [Validators.required]],
     phoneNumber: [null, [Validators.required]],
     clientAdress:[null,[Validators.required]]
    })
  }
  getClientInfo(clientId:any){
    this.clientId=clientId;
    console.log(clientId);
if (clientId) {
 this._ClientsService.GetClient(clientId).subscribe((res:any)=>{
   console.log(res);
  this.AddSanitaryConnectionsForm.patchValue({
    clientId: clientId
  })
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

   })
}
GetAllClients() {
  this._ClientsService.GetAllClients().subscribe({
    next: (res: Clients) => {
      this.allClients = res.data
    }
  })
}
GetClientFileId(FileNo:any){
  this.topService.getClietFileId(this.clientId,FileNo).subscribe((res:any)=>{
    this.GetAllSanitaryConnectionsByClientAndFileNo(this.clientId,FileNo);
    this.AddSanitaryConnectionsForm.patchValue({
      ClientFileId:res.data.clientFileId
    })
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
  handleDate(date:any){
    let year, month, day;
     let Fdate = new Date(date).toLocaleString().split(',')[0]
    year = Fdate.split('/')[2]
    month = Fdate.split('/')[0]
    day = Fdate.split('/')[1]
    let newDate = (year)+'-'+(+month < 10 ? '0'+month : month )+'-'+(+day < 10 ? '0'+day : day )
    return newDate;
  }
  GetSanitaryConnectionById(id :any){
    this.sanitaryConnectionService.GetSanitaryConnectionById(id).subscribe({next:(res:any)=>{
      res.data
      this.clientForm.get('clientId')?.patchValue(res.data.clientId)
      this.AddSanitaryConnectionsForm.patchValue({
        clientId: res.data.clientId,
        FileNo:res.data.fileNo,
        PointId:res.data.pointId,
        KitchenHeight:res.data.kitchenHeight,
        TarkeebDate:this.handleDate(res.data.tarkeebDate),
        Attachement:res.data.attachementPath,
        Notes:res.data.notes,
      })
    }})
  }
  GetAllSanitaryConnectionsByClientAndFileNo(clientId:any , fileNo:any){
    this.sanitaryConnectionService.GetAllSanitaryConnectionsByClientAndFileNo(clientId , fileNo).subscribe({ next: (value: any) => {
      this.sanitaryConnections=value.data;
      if (this.sanitaryConnections.length==0) {
       // this.toastr.error("لا يوجد توصيلات صحيه لهذا الملف")
      }
    }
   })
  }
  getPoints(){
    this.sanitaryConnectionService.getPoints().subscribe((res:any)=>{
      this.points=res.data.statuses
    })
  }

}
