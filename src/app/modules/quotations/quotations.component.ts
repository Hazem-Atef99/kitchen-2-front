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
 }
 GetShortClientFiles(){
  this._QuotationsService.GetShortClientFiles().subscribe({
    next:(res:any)=>{
      this.allQuotations = res.data
    }
  })
 }
}
