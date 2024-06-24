import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading:boolean = false;
  errorsLogin:string = '';
  constructor(
    private _LoginService: LoginService,
    private fb: FormBuilder,
    private _Router: Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initForm()
  }
  initForm() {
    return this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  login() {
    this.loading=true;
    this._LoginService.Login(this.loginForm.value).subscribe({
      next:(res:any)=>{
        localStorage.setItem('TOKEN_KITCHEN2', res.data.token);
        // const userinfo =this.getUserInfo(res.data.token);
        // console.log("userinfo",userinfo);
        //localStorage.setItem("UserId",userinfo)
        this._Router.navigateByUrl('/');
        this.loading = false;
      },error:(err:any) =>{
        this.loading = false;
        this.errorsLogin = err.message;
        this.toastr.error("Username or password is not correct");
      }
    })
  }
  // decodeToken(token: string): TokenPayload | null {
  //   try {
  //     const decodedToken = jwtDecode<TokenPayload>(token);
  //     return decodedToken;
  //   } catch (error) {
  //     console.error('Error decoding token', error);
  //     return null;
  //   }
  // }

  // Example method to get user info from the token
  // getUserInfo(token: string) {
  //   const decodedToken = this.decodeToken(token);
  //   if (decodedToken) {
  //     return {
  //       userId: decodedToken.userId,
  //       roles: decodedToken.roles,

  //     };
  //   }
  //   return null;
  // }
}
interface TokenPayload {
  // Define the structure of your token payload here
  userId: string;
  roles: string[];
  exp: number;
  // Add any other fields you expect in the payload
}
