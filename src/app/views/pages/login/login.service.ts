import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  domain: string = env.apiUrl;

  constructor(private _HttpClient: HttpClient) { }

  Login(form:any): Observable<any> {
    return this._HttpClient.post(`${this.domain}Users/Login` , form)
  }
}
