import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientPaymentService {
  domain: string = env.apiUrl;
  constructor(private http:HttpClient) { }
  getClientPayment(id:any){
    return this.http.get(`${this.domain}ClientPayment/GetClientPayment?clientId=${id}`)
  }
  AddClientPayment(data:any){
    return this.http.post(`${this.domain}ClientPayment/AddClientPayment`,data)
  }
}
