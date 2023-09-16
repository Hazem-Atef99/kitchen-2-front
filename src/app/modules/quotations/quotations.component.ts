import { Component, OnInit } from '@angular/core';
import { QuotationsService } from './quotations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {
  today: Date = new Date();
  allQuotations: any[] = [];
  statusCategoryById: any;;
  viewImg: any[] = [];
  uploadedImg: any[] = [];
  allClientFileAttachment: any[] = [];
  currentPage: number = 1;
  filterForm!: FormGroup;
  clientFileId: number = 0;
  statusId: number = 0;
  Note : String = '';
  query:any ={
    PageType : 0
  }
  constructor(
    private _QuotationsService: QuotationsService,
    private _FormBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }
  initFilterForm(): FormGroup {
    return this._FormBuilder.group({
      userId: [null],
      fileTypeId: [null],
      finalStatusId: [null],
      PageType: 0,
    })
  }
  filter(event: any) {
    console.log(event.value);
    event.value ? this.query['fileTypeId'] = event.value : this.query['fileTypeId'] = null ;

    this.GetShortClientFiles();
  }
  ngOnInit(): void {
    this.GetShortClientFiles();
    this.GetStatusCategoryById()
  }
  GetShortClientFiles() {
    this._QuotationsService.GetShortClientFiles(this.query).subscribe({
      next: (res: any) => {
        this.allQuotations = res.data
      }
    })
  }
  GetStatusCategoryById() {
    this._QuotationsService.GetStatusCategoryById(100).subscribe({
      next: (res: any) => {
        this.statusCategoryById = res.data
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
    value['statusId'] = this.statusId ;

      this._QuotationsService.AddClientFileAttachment(value).subscribe({
        next: (res: any) => {
          this.toastr.success(`${res.message}`);
          this.viewImg = []
          this.uploadedImg = []
        }, error: (err: any) => {
          this.toastr.error(`${err.message}`);
        }
      })
    }
    GetAllClientFileAttachment(){
      this._QuotationsService.GetAllClientFileAttachment(this.clientFileId).subscribe({
        next: (res: any) => {
          this.allClientFileAttachment = res.data
        }
      })
    }

    AddClientFileFollowUp() {
      let value: any = {};
  
      value['clientFileId'] = this.clientFileId;
      value['attachment'] = this.uploadedImg[0];
      value['Note'] = this.Note ;
  
        this._QuotationsService.AddClientFileFollowUp(value).subscribe({
          next: (res: any) => {
            this.toastr.success(`${res.message}`);
            this.viewImg = []
            this.uploadedImg = [];
            this.Note = ''
          }, error: (err: any) => {
            this.toastr.error(`${err.message}`);
          }
        })
      }

      GetAllFollowUp(){
        this._QuotationsService.GetAllFollowUp(this.clientFileId).subscribe({
          next: (res: any) => {
            this.allClientFileAttachment = res.data
          }
        })
      }
  }
