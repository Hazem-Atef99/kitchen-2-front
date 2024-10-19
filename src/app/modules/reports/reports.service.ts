import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  domain: string = env.apiUrl;

  constructor(private _HttpClient: HttpClient) { }
  GetContractsReports(quaryData){
    return this._HttpClient.get(`${this.domain}Report/AllContractReport?pFromDate=${quaryData.dateFrom}&pToDate=${quaryData.dateTo}&IsExcel=${quaryData.IsExcel}`)
  }
}
