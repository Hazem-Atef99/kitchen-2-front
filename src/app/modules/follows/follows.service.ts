import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FollowsService {
  domain: string = env.apiUrl;
  constructor(private http:HttpClient) { }

  GetAllFollows(clientFileId:any){
    return this.http.get(`${this.domain}FollowUp/GetAllFollowUp?clientFileId=${clientFileId}`)
  }
  GetFollowsByFilter(data:any){
    return this.http.post(`${this.domain}FollowUp/FilterFollowUp`,data)
  }
  GetFollowDetails(FollowId:any){
    return this.http.get(`${this.domain}FollowUp/GetFollowupDetails?id=${FollowId}`)
  }
  AddFollowdetail(data:any){
    return this.http.post(`${this.domain}FollowUp/AddClientFileFollowUp`,data)
  }
}
