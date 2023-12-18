import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FollowsService {
  domain: string = env.apiUrl;
  constructor(private http:HttpClient) { }

  GetAllFollows(){
    return this.http.get(`${this.domain}FollowUp/GetAllFollowUp`)
  }
}
