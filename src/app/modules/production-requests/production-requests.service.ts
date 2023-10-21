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
    AddProductionRequests(body:FormGroup): Observable<any> {
      return this._HttpClient.post(`${this.domain}ClientFile/AddProductionRequests`,body)
    }
}
