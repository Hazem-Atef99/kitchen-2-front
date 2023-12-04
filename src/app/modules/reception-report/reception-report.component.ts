import { ReceptionReportService } from './reception-report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reception-report',
  templateUrl: './reception-report.component.html',
  styleUrls: ['./reception-report.component.scss']
})
export class ReceptionReportComponent implements OnInit {
  query: any = {
    PageType: 0,
    fileTypeId: null,
  }
  allReceptionReports: any;
  constructor(private recptionReportService:ReceptionReportService) { }
  ngOnInit(): void {
    this.getReceptionRports()
  }
  filter(event: any) {
    console.log(event.value);
    event.value ? this.query['fileTypeId'] = event.value : this.query['fileTypeId'] = null;
    // this.GetShortClientFiles();
  }
  getReceptionRports(){
    this.recptionReportService.getReceptionReport().subscribe((res:any)=>{
      this.allReceptionReports=res.data
    })
  }
}
