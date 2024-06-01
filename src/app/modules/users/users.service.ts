import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  domain: string = env.apiUrl;
  constructor(private http :HttpClient) { }
  GetAllUsers(status?:any){
    if (status||status==0) {
      return this.http.get(`${this.domain}Users/GetAllUsers?status =${status}`)
    }else{
      return this.http.get(`${this.domain}Users/GetAllUsers`)
    }
  }
  DeleteUser(id:any){
    return this.http.delete(`${this.domain}Users/RemoveUser?userId=${id}`);
  }
  AddUser(data:any){
    return this.http.post(`${this.domain}Users/AddUser`,data)
  }
  editUser(userId:any,data:any){
    return this.http.put(`${this.domain}Users/EditUser?id=${userId}`,data)
  }
  GetUser(userId:any){
    return this.http.get(`${this.domain}Users/GetUserById?id=${userId}`)
  }
  setNewPassword(data:any){
    return this.http.put(`${this.domain}Users/SetNewPassword`,data)
  }
  getRoles(){
    return this.http.get(`${this.domain}RoleTypes/GetAllRoleTypes`);
  }
  UpdatePowersForRole(body :any){
    return this.http.put(`${this.domain}RoleTypes//AddPermissionToRole`,body)
  }

  GetAllPermission(){
    return this.http.get(`${this.domain}RoleTypes/GetAllPermissions`)
  }
  GetPermissionsOfRole(id:any){
    return this.http.get(`${this.domain}RoleTypes/GetPermissionsOfRole/${id}`)
  }
}
