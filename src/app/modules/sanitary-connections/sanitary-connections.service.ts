import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SanitaryConnectionsService {
  domain: string = env.apiUrl;
  constructor(private http :HttpClient) { }
  // Get all sanitary connections
  GetAllSanitaryConnections(userId?:any){
    if (userId) {
      return this.http.get(`${this.domain}HealthRecommendations/GetAllHealthRecommendation?userId=${userId}`)
    }else{
      return this.http.get(`${this.domain}HealthRecommendations/GetAllHealthRecommendation`)
    }
  }
  AddSanitaryConnection(data:any){
    return this.http.post(`${this.domain}HealthRecommendations/AddHealthRecommendation`, data);
  }
}
