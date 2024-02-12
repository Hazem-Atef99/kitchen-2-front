import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  userId: any;
  userForm!:FormGroup;
  selectedOptions: any[] = [];
  statuses:any=[
    {
      name:'غير فعال',
      id:0
    },
    {
      name:'فعال',
      id:1
    }
  ]
  // roles:any=[
  //   {
  //     name:'يمكنه عرض جميع ملفات الزبائن',
  //     id:1
  //   },
  //   {
  //     name:'مسئول التصميم',
  //     id:2
  //   },
  //   {
  //     name:'مسئول القياس',
  //     id:3
  //   },
  //   {
  //     name:'المبيعات',
  //     id:4
  //   },
  //   {
  //     name:'المصنع',
  //     id:5
  //   }
  // ]
  roles :any []=[];
  dataToPatch: any[]=[];
  constructor(private _activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private toastr:ToastrService,
              private userService:UsersService) {
    this.userId=this._activatedRoute.snapshot.queryParamMap.get('Id')
   }
  ngOnInit(): void {
    this.userForm=this.initUserForm();
    this.getUser();
    this.getRoles();
  }
  getUser(){
    this.userService.GetUser(this.userId).subscribe({next:(res:any)=>{
      this.dataToPatch =res.data.roleTypes
      this.dataToPatch.forEach(role => {
        this.selectedOptions.push(role.id)
      });
      console.log('selected options',this.selectedOptions);

      this.userForm.patchValue({
        userName:res.data.userName,
        fullName:res.data.fullName,
        statusId:res.data.statusId,
        email:res.data.email,

      })
    }})
  }
  AddUser(){
    this.userForm.get('roleIds')?.patchValue(this.selectedOptions)
    console.log(this.userForm.value);
    if(this.userId){
      this.userService.editUser(this.userId,this.userForm.value).subscribe({next:(res:any)=>{
        this.toastr.success(res.message)
      },error:(err:any)=>{
        this.toastr.error("حدث خطأ")
      }})
    }else{
      this.userService.AddUser(this.userForm.value).subscribe({next:(res:any)=>{
        this.toastr.success(res.message)
      },error:(err:any)=>{
        this.toastr.error("حدث خطأ")
      }})
    }


  }
  initUserForm():FormGroup{
    return this.formBuilder.group({
      userName:[''],
      fullName:[''],
      statusId:[''],
      password:[''],
      email:[''],
      roleIds:[[],],
      selectedRoles:['']
    })
  }
  isSelected(id: number): boolean {
    return this.selectedOptions.includes(id);
  }
  selectOption(event:any,option:any){
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the option to the selectedOptions array
      if (this.selectedOptions.indexOf(option.id) === -1) {
        this.selectedOptions.push(option.id);
      }
    } else {
      // Remove the option from the selectedOptions array
      const index = this.selectedOptions.indexOf(option.id);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);

  }
  }
  console.log(this.selectedOptions);
  }
  getRoles(){
    this.userService.getRoles().subscribe({next:(res:any)=>{
      this.roles=res.data;
    }})
  }
}
