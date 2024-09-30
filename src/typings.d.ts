declare module 'pdfjs-dist/build/pdf';
declare module 'pdfjs-dist/build/pdf.worker.entry';
declare module 'pdfjs-dist/web/pdf_viewer' {
  export class PDFViewer {
    constructor(options: any);
    setDocument: (document: any) => void;
  }
}
