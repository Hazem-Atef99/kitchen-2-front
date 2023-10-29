import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductionRequestsService {
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
  EditClientFile(body:FormGroup, id: number): Observable<any> {
    return this._HttpClient.post(`${this.domain}ClientFile/UpdateClientFile/${id}`,body)
  }
  AddProductionRequests(body:FormGroup): Observable<any> {
    return this._HttpClient.post(`${this.domain}ClientFile/AddProductionRequests`,body)
  }
  GetStatusCategoryById(id: number): Observable<any> {
    return this._HttpClient.get(`${this.domain}StatusCategory/GetStatusCategoryById/${id}`)
  }
  GetAllUsersApi(): Observable<any> {
    return this._HttpClient.get(`${this.domain}Users/GetAllUsers`)
  }
  GetProductionRequestsByIdApi(id: number): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFile/GetClientFileById/${id}`)
  }
  getLoadProductionRequests(): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFile/LoadProductionRequests`)
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
  AddFinalStatusListApi(value:any): Observable<any> {
    return this._HttpClient.put(`${this.domain}ClientFile/ChangeFinalStatusClientFile`,value)
  }
  GetAllClientFileAttachment(data:any): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFileAttachment/GetAllClientFileAttachment`, {params: data})
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
  AddNotices(value:any): Observable<any> {
    return this._HttpClient.put(`${this.domain}ClientFile/AddPreparingReception?clientFileId=${value.clientFileId}`,value)
  }
  GetAllFollowUp(clientFileId:number): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFileAttachment/GetAllFollowUp?clientFileId=${clientFileId}`)
  }
  AllFinalStatusClientFile(clientFileId:number): Observable<any> {
    return this._HttpClient.get(`${this.domain}ClientFile/GetAllFinalStatusClientFile?clientFileId=${clientFileId}`)
  }
  LoadFinalStatusList(itemType :number): Observable<any> {
    return this._HttpClient.get(`${this.domain}StatusCategory/LoadFinalStatusList/${itemType}`)
  }
}
