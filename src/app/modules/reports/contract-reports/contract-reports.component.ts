import { ActivatedRoute } from '@angular/router';
import { ReportsService } from './../reports.service';
import { Component } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contract-reports',
  templateUrl: './contract-reports.component.html',
  styleUrls: ['./contract-reports.component.scss']
})
export class ContractReportsComponent {
  base64String: string = '';
  clientFileId: any;
  zoom = 1.0;
  pdfDocument: any;
  pdfViewer: any;
  Isloading = false;
  FilterForm :FormGroup;
   currentDate = new Date();
 threeMonthsAgo = new Date();

  ngAfterViewInit(): void {
    const loadingTask = pdfjsLib.getDocument({ data: this.base64ToArrayBuffer(this.base64String) });
    loadingTask.promise.then((pdf) => {
      this.pdfDocument = pdf;
      const viewerContainer = document.getElementById('viewerContainer');
      this.pdfViewer = new pdfjsLib.PDFViewer({
        container: viewerContainer,
      });
      this.pdfViewer.setDocument(pdf);
    });
  }
  private base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }


  constructor(
    private _ReportService: ReportsService,
    private _activatedRoute: ActivatedRoute,
    private _FormBuilder:FormBuilder
  ) {
    let clientFileId: any = _activatedRoute.snapshot.queryParamMap.get('clientFileId')
    this.clientFileId = +clientFileId
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    this.FilterForm = this.filterFormGroup();
  }
  ngOnInit(): void {

  }
  filterFormGroup(): FormGroup {
    return this._FormBuilder.group({
      DateFrom:[this.handleDate(this.threeMonthsAgo.setMonth(this.currentDate.getMonth() - 3)),Validators.required],
      DateTo:[this.handleDate(Date.now()),Validators.required],
      IsExel:[false]
    })}
  get pdfSrc() {
    return this.base64String ? `data:application/pdf;base64,${this.base64String}` : '';
  }

  // getQuatationReport() {
  //   this.Isloading = true
  //   this._QuotationsService.GetqutationReport(this.clientFileId).subscribe({
  //     next:
  //       (res: any) => {
  //         this.base64String = res.data;
  //         this.Isloading = false
  //       }
  //     , error: (err: any) => {
  //       this.Isloading = false

  //     }

  //   })
  // }
  getContractReport(){
    this.Isloading=true
    let quaryData= {
      dateFrom : this.FilterForm.get('DateFrom')?.value,
      dateTo : this.FilterForm.get('DateTo')?.value,
      IsExcel : this.FilterForm.get('IsExel')?.value

    }
    this._ReportService.GetContractsReports(quaryData).subscribe({
      next:(res:any)=>{
        this.base64String = res.data;
        this.Isloading=false
      },
      error:(err:any)=>{
        this.Isloading=false
      }
    })
  }
  zoomIn() {
    this.zoom += 0.1;
  }

  zoomOut() {
    if (this.zoom > 0.1) {
      this.zoom -= 0.1;
    }
  }

  downloadPDF() {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,' + this.base64String;
    link.download = 'Document.pdf';
    link.click();
  }

  printPDF() {
    const byteCharacters = atob(this.base64String); // Convert base64 to binary data
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create an object URL for the Blob
    const blobURL = URL.createObjectURL(blob);

    // Open the PDF in a new window
    const newWindow = window.open(blobURL, '_blank');

    if (newWindow) {
      // Wait for the PDF to load before printing
      newWindow.onload = () => {
        newWindow.focus();  // Bring the new window into focus
        newWindow.print();  // Trigger the print dialog
      };
    } else {
      console.error('Failed to open the new window for printing.');
    }
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
}
