import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment as env } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  domain: string = env.apiUrl;

  constructor(private _HttpClient: HttpClient) { }

  GetShortClientFiles(query:any): Observable<any> {
    let value:any = {}
    for (const key in query) {
      if (query[key] != null) {
        value[key] = query[key]
      }
    }
    return this._HttpClient.get(`${this.domain}ClientFile/GetShortClientFiles` , {params:value})
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
  AddClientFileAttachment(value:any): Observable<any> {
    const formData = new FormData();
    for (const key in value) {
      if (value[key]) {
        formData.append(key, value[key])
      }
    }
    return this._HttpClient.put(`${this.domain}ClientFileAttachment/AddClientFileAttachment?clientFileId=${value.clientFileId}`,formData)
  }
  GetAllClientFileAttachment(clientFileId:number): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFileAttachment/GetAllClientFileAttachment?clientFileId=${clientFileId}`)
  }
  AddClientFileFollowUp(value:any): Observable<any> {
    const formData = new FormData();
    for (const key in value) {
      if (value[key]) {
        formData.append(key, value[key])
      }
    }
    return this._HttpClient.put(`${this.domain}ClientFileAttachment/AddClientFileFollowUp?clientFileId=${value.clientFileId}`,formData)
  }
  GetAllFollowUp(clientFileId:number): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFileAttachment/GetAllFollowUp?clientFileId=${clientFileId}`)
  }
}
