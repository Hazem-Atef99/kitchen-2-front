import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  domain: string = 'http://194.163.132.242:5000/api/';

  constructor(private _HttpClient: HttpClient) { }

  Login(form:any): Observable<any> {
    return this._HttpClient.post(`${this.domain}Users/Login` , form)
  }
}
