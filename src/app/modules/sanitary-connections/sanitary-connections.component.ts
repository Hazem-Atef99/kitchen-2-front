import { ToastrService } from 'ngx-toastr';
import { SanitaryConnectionsService } from './sanitary-connections.service';
import { Component, OnInit } from '@angular/core';
import { QuotationsService } from '../quotations/quotations.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sanitary-connections',
  templateUrl: './sanitary-connections.component.html',
  styleUrls: ['./sanitary-connections.component.scss']
})
export class SanitaryConnectionsComponent implements OnInit {
  query: any = {
    PageType: 4,
    fileTypeId: 1,
  }
  sanitaryConnections :any[]=[];
  clientFileId: number = 0;
  viewImg: any[] = [];
  uploadedImg: any[] = [];
  allClientFileAttachment: any[] = [];
  statusCategoryById: any;
  statusId: number = 0;
  Domain: any = environment.apiUrl;
  visible=false;
  constructor(private sanitaryConnectionService:SanitaryConnectionsService,
              private toastr:ToastrService,
              private _QuotationsService:QuotationsService) {

  }
  ngOnInit(): void {
    this.GetAllSanitaryConnections();
    this.GetStatusCategoryById();
  }
  filter(event: any) {
    console.log(event.value);
    event.value ? this.query['fileTypeId'] = event.value : this.query['fileTypeId'] = null;
    this.GetAllSanitaryConnections();
  }
  GetAllSanitaryConnections(){
    this.sanitaryConnectionService.GetAllSanitaryConnections().subscribe({
      next:(res:any)=>{
        this.sanitaryConnections=res.data;
      }
    })
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
        this.GetAllSanitaryConnections();
        this.visible=true;
      }, error: (err: any) => {
        this.toastr.error(`${err.message}`);
        this.visible=true
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
}
