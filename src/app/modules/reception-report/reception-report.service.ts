import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReceptionReportService {
  domain: string = env.apiUrl;

  constructor(private http:HttpClient) { }
  getReceptionReport(){
    return this.http.get(`${this.domain}ClientFile/GetAllPreparingReception`)
  }
}
