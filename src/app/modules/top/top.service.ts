import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopService {
  domain: string = env.apiUrl;
  constructor(private http:HttpClient) { }
  getTopList() {
    return this.http.get(`${this.domain}ClientFileTop/GetAllFileClientTop`)
  }
  getFileNumber(id:any){
    return this.http.get(`${this.domain}ClientFile/GetClientFilesByClient?clientId=${id}&page=4`)
  }
  getClietFileId(ClientId:any,clientFileNO : any){
    return this.http.get(`${this.domain}ClientFile/GetClientFileByClientAndFileNo?clientId=${ClientId}&fileNo=${clientFileNO}&page=4`)
  }
  LoadClientFileTopPage() {
    return this.http.get(`${this.domain}ClientFileTop/LoadClientFileTopPage`)
  }
  AddTop(data:any){
    return this.http.post(`${this.domain}ClientFileTop/AddClientFileTop`,data);
  }
  GetTopById(id:any){
    return this.http.get(`${this.domain}ClientFileTop/GetFileClientTopById?Id=${id}`)
  }
  UpdateTop(id:any,data:any){
    return this.http.put(`${this.domain}ClientFileTop/EditClientFileTop?id=${id}`,data)
  }
  DeletTop(id:any){
    return this.http.delete(`${this.domain}ClientFileTop/DeleteFileClientTopById?Id=${id}`)
  }
  AddTopDevices(data:any){
    return this.http.post(`${this.domain}ClientFileTop/AddTopDevices`,data);
  }
}
