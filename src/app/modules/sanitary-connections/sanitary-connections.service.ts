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
  GetSanitaryConnectionById(id:any){
    return this.http.get(`${this.domain}HealthRecommendations/GetHealthRecommendationById?id=${id}`)
  }
  GetAllSanitaryConnectionsByClientAndFileNo(clientId:any, fileNo:any){
    return this.http.get(`${this.domain}HealthRecommendations/GetHealthRecommendationByClientAndFileNo?clientId=${clientId}&fileNo=${fileNo}`)
  }
  getPoints(){
    return this.http.get(`${this.domain}StatusCategory/GetStatusCategoryById/60`)
  }
  updateSanitaryConnection(id:any,data:any){
    return this.http.put(`${this.domain}HealthRecommendations/EditHealthRecommendation?id=${id}`,data)
  }
}
