import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from 'src/app/modules/contract/contract.service';
import { QuotationsService } from 'src/app/modules/quotations/quotations.service';
import { UsersService } from 'src/app/modules/users/users.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  changePassForm!:FormGroup;
  powersForm!:FormGroup;
  allUsersData: any;
  Powers: any[]= [];
  selectedOptions: any[] = [];
  dataToPatch:any[]=[];
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
    private router:Router,
    private userService:UsersService,
    private formBuilder:FormBuilder,
    private _QuotationsService:QuotationsService,
    private _ConttactService:ContractService,
    private toastr:ToastrService) {

    super();

  }
  logOut(){
    localStorage.removeItem('TOKEN_KITCHEN2');
    this.router.navigateByUrl('/login')
  }
  ngOnInit() {
    this.changePassForm=this.initChangePassForm();
    this.powersForm=this.initPowersForm();
    this.GetAllUsers();
    this.getpowers();
  }
  initChangePassForm():FormGroup{
    return this.formBuilder.group({
      newPassword:[null, [Validators.required]],
      oldPassword:[null, [Validators.required]]
    })
  }
  initPowersForm():FormGroup{
    return this.formBuilder.group({
      UserId:[null,[Validators.required]],
      selectedPower: [null, [Validators.required]],
      Powers: this.formBuilder.array([]),
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
  AddPowers(){
    //const PowersArray = this.powersForm.get('Powers') as FormArray;
    console.log(this.selectedOptions);


    console.log(this.powersForm.value)
    this.userService.UpdatePowersForRole(this.powersForm.get('UserId')?.value,this.selectedOptions).subscribe({
      next:(res:any)=>{
        this.toastr.success("تم تعديل الصلاحيات")
      },
      error:(err:any)=>
        {
          this.toastr.error("حدث خطأ")
        }
    })
  }
  GetAllUsers() {
    this.userService.getRoles().subscribe({
      next: (res: any) => {
        this.allUsersData = res.data
      }
    })
  }
  getpowers(){
    this._ConttactService.GetStatusCategoryById(94).subscribe(res=>{
      this.Powers=res.data.statuses
      console.log(this.Powers);

    })
  }
  isSelected(statusId: number): boolean {
    return this.selectedOptions.includes(statusId);
  }
  selectOption(event:any,option:any){
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the option to the selectedOptions array
      if (this.selectedOptions.indexOf(option.statusId) === -1) {
        this.selectedOptions.push(option.statusId);
      }
    } else {
      // Remove the option from the selectedOptions array
      const index = this.selectedOptions.indexOf(option.statusId);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);

  }
  }
  console.log(this.selectedOptions);
  }
  getPowersForRole(){
    this._ConttactService.GetFinalStatusOfRole(this.powersForm.get('UserId')?.value).subscribe({
      next: (res: any) => {
        this.dataToPatch=res.data;
        this.dataToPatch.forEach(Power=>{
          this.selectedOptions.push(Power.statusId)
        })

      }
    })
  }
}
