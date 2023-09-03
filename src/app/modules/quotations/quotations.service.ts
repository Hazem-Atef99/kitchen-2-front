import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  domain: string = 'http://194.163.132.242:5000/api/';

  constructor(private _HttpClient: HttpClient) { }

  GetShortClientFiles(): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFile/GetShortClientFiles?PageType=1`)
  }
  AddClientFile(body:FormGroup): Observable<any> {
    return this._HttpClient.post(`${this.domain}ClientFile/AddClientFile`,body)
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
