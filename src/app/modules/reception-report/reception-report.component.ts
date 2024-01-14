import { ToastrService } from 'ngx-toastr';
import { QuotationsService } from '../quotations/quotations.service';
import { ReceptionReportService } from './reception-report.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reception-report',
  templateUrl: './reception-report.component.html',
  styleUrls: ['./reception-report.component.scss']
})
export class ReceptionReportComponent implements OnInit {
  query: any = {
    PageType: 0,
    fileTypeId: 1,
  }
  allReceptionReports: any;
  clientFileId: number = 0;
  statusId: number = 0;
  allClientFileAttachment: any[] = [];
  statusCategoryById: any;
  viewImg: any[] = [];
  uploadedImg: any[] = [];
  Domain: any = environment.apiUrl;
  LoadFinalStatusList: any[] = [];
  Note: String = '';
  AllFinalStatusClientFile: any[] = [];
  constructor(private recptionReportService:ReceptionReportService,
              private _QuotationsService:QuotationsService,
              private toastr: ToastrService,) { }
  ngOnInit(): void {
    this.getReceptionRports()
    this.GetStatusCategoryById()
  }
  filter(event: any) {
    console.log(event.value);
    event.value ? this.query['fileTypeId'] = event.value : this.query['fileTypeId'] = null;
     this.getReceptionRports();
  }
  getReceptionRports(){
    this.recptionReportService.getReceptionReport().subscribe((res:any)=>{
      this.allReceptionReports=res.data
      console.log(res.data);

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
  GetStatusCategoryById() {
    this._QuotationsService.GetStatusCategoryById(100).subscribe({
      next: (res: any) => {
        this.statusCategoryById = res.data
        console.log()
        this.statusId = res.data.statuses[0].statusId
      }
    })
  }
  GetLoadFinalStatusList() {
    console.log(this.query.PageType)
    this._QuotationsService.LoadFinalStatusList(this.query.PageType).subscribe({
      next: (res: any) => {
        this.LoadFinalStatusList = res.data.statuses
      }
    })
  }
  AddFinalStatusList() {
    let value: any = {};
    value['clientFileId'] = this.clientFileId;
    value['finalStatusId'] = this.statusId;
    value['notes'] = this.Note;
    this._QuotationsService.AddFinalStatusListApi(value).subscribe({
      next: (res: any) => {
        this.toastr.success(`${res.message}`);
        this.viewImg = []
        this.uploadedImg = []
        this.GetAllFinalStatusClientFile()
        this.getReceptionRports()
      }, error: (err: any) => {
        this.toastr.error(`${err.message}`);
      }
    })
  }
  GetAllFinalStatusClientFile() {
    this._QuotationsService.AllFinalStatusClientFile(this.clientFileId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.AllFinalStatusClientFile  = res.data
        console.log('all final status',this.AllFinalStatusClientFile);

      }
    })
  }
}
