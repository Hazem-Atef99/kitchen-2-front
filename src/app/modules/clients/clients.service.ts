import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Clients} from './modal/clients'
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  domain: string = 'http://194.163.132.242:8080/api/Client/';

  constructor(private _HttpClient: HttpClient) { }

  GetAllClients(): Observable<Clients> {
    return this._HttpClient.get<Clients>(`${this.domain}GetAllClients`)
  }
  AddClientFile(form:FormGroup): Observable<Clients> {
    return this._HttpClient.post<Clients>(`${this.domain}AddClientFile`,form)
  }
}
