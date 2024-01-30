import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/modules/users/users.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  changePassForm!:FormGroup;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
    private router:Router,
    private userService:UsersService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService) {

    super();

  }
  logOut(){
    localStorage.removeItem('TOKEN_KITCHEN2');
    this.router.navigateByUrl('/login')
  }
  ngOnInit() {
    this.changePassForm=this.initChangePassForm();
  }
  initChangePassForm():FormGroup{
    return this.formBuilder.group({
      newPassword:[null, [Validators.required]],
      oldPassword:[null, [Validators.required]]
    })
  }
  changePassword(){
    if (this.changePassForm.valid){
      this.userService.setNewPassword(this.changePassForm.value).subscribe({next:(res:any)=>{
        this.toastr.success("تم تغيير كلمة السر")
      },error:(err:any)=>{
        this.toastr.error("حدث خطأ")
      }})
    }
  }
}
