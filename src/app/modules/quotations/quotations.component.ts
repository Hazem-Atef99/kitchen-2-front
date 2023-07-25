import { Component ,OnInit } from '@angular/core';
import { QuotationsService } from './quotations.service';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit{
 today:Date = new Date();
 allQuotations:any[]=[];
 constructor(
  private _QuotationsService: QuotationsService
 ){}
 ngOnInit(): void {
     this.GetAllClientFiles();
 }
 GetAllClientFiles(){
  this._QuotationsService.GetAllClientFiles().subscribe({
    next:(res:any)=>{
      this.allQuotations = res.data
    }
  })
 }
}
