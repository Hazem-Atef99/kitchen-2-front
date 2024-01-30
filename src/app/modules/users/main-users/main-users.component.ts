import { ToastrService } from 'ngx-toastr';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss']
})
export class MainUsersComponent implements OnInit {
  Users : any[]=[];

  constructor(private usersService:UsersService,
              private toastr:ToastrService) {

  }
  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers(){
    this.usersService.GetAllUsers().subscribe({next :(res:any)=>{
      this.Users=res.data
    }})
  }
  deleteUser(id:any){
    this.usersService.DeleteUser(id).subscribe({next:((res:any)=>{
      this.toastr.success(res.message)
    }),error:(err:any)=>{
      this.toastr.error(err.message)
    }})
  }
}
