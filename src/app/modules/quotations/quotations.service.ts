import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  domain: string = 'http://194.163.132.242:5000/api/';

  constructor(private _HttpClient: HttpClient) { }

  GetAllClientFiles(): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFile/GetAllClientFiles`)
  }
  AddClientFile(): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFile/AddClientFile`)
  }
  GetStatusCategoryById(id: number): Observable<any> {
    return this._HttpClient.get(`${this.domain}StatusCategory/GetStatusCategoryById/${id}`)
  }
  LoadPriceOffer(): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFile/LoadPriceOffer`)
  }
  GetUnitsItemsbyCategory(): Observable<any> {
    return this._HttpClient.get(`${this.domain}StatusCategory/GetUnitsItemsbyCategory`)
  }
}
