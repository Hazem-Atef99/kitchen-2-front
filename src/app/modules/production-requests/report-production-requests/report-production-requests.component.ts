import { Component } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.js';
import { ProductionRequestsService } from '../production-requests.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-report-production-requests',
  templateUrl: './report-production-requests.component.html',
  styleUrls: ['./report-production-requests.component.scss']
})
export class ReportProductionRequestsComponent {
  base64String: string = '';
  clientFileId: any;
  zoom = 1.0;
  pdfDocument: any;
  pdfViewer: any;
  Isloading = false;
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
    private _productionRequestsService:ProductionRequestsService,
    private _activatedRoute: ActivatedRoute,
  ) {
    let clientFileId: any = _activatedRoute.snapshot.queryParamMap.get('clientFileId')
    this.clientFileId = +clientFileId
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  }
  ngOnInit(): void {
    this.getQuatationReport();
  }
  get pdfSrc() {
    return this.base64String ? `data:application/pdf;base64,${this.base64String}` : '';
  }

  getQuatationReport() {
    this.Isloading = true
    this._productionRequestsService.GetProductionReqestsReport(this.clientFileId).subscribe({
      next:
        (res: any) => {
          this.base64String = res.data;
          this.Isloading = false
        }
      , error: (err: any) => {
        this.Isloading = false

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
}
