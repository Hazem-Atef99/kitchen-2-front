import { Component ,OnInit } from '@angular/core';
import { QuotationsService } from './quotations.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit{
 today:Date = new Date();
 allQuotations:any[]=[];
 statusCategoryById:any;;
 viewImg:any [] = [] ;
uploadedImg:any [] = [] ;
 currentPage: number = 1;
 filterForm!:FormGroup;
 constructor(
  private _QuotationsService: QuotationsService,
  private _FormBuilder : FormBuilder
 ){}
 initFilterForm():FormGroup{
  return this._FormBuilder.group({
    userId :[null],
    fileTypeId :[null],
    finalStatusId :[null],
    PageType :0,
  })
 }
 filter(event:any){
  console.log(event);
  
 }
 ngOnInit(): void {
   this.GetShortClientFiles();
   this.GetStatusCategoryById()
 }
 GetShortClientFiles(){
  this._QuotationsService.GetShortClientFiles().subscribe({
    next:(res:any)=>{
      this.allQuotations = res.data
    }
  })
 }
 GetStatusCategoryById(){
  this._QuotationsService.GetStatusCategoryById(100).subscribe({
    next:(res:any)=>{
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
}
