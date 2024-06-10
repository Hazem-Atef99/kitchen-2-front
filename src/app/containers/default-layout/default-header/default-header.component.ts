import { filter } from 'rxjs/operators';
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
  changePassForm!: FormGroup;
  powersForm!: FormGroup;
  allUsersData: any;
  Powers: any[] = [];
  Permissions: any[] = [];
  selectedOptions: any[] = [];
  selectedPageOpions: any[] = [];
  dataToPatch: any[] = [];
  pagesRoleToPatch: any[] = [];
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
    private router: Router,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private _QuotationsService: QuotationsService,
    private _ConttactService: ContractService,
    private toastr: ToastrService) {

    super();

  }
  logOut() {
    localStorage.removeItem('TOKEN_KITCHEN2');
    this.router.navigateByUrl('/login')
  }
  ngOnInit() {
    this.changePassForm = this.initChangePassForm();
    this.powersForm = this.initPowersForm();
    this.GetAllUsers();
    this.getpowers();
    this.getAllPermission();
  }
  initChangePassForm(): FormGroup {
    return this.formBuilder.group({
      newPassword: [null, [Validators.required]],
      oldPassword: [null, [Validators.required]]
    })
  }
  initPowersForm(): FormGroup {
    return this.formBuilder.group({
      UserId: [null, [Validators.required]],
      selectedPower: [null, [Validators.required]],
      selectedChildPower: [null, [Validators.required]],
      selectedPagePower: [null, [Validators.required]],
      Powers: this.formBuilder.array([]),
    })
  }
  changePassword() {
    if (this.changePassForm.valid) {
      this.userService.setNewPassword(this.changePassForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success("تم تغيير كلمة السر")
        }, error: (err: any) => {
          this.toastr.error("حدث خطأ")
        }
      })
    }
  }
  removeDuplicates(arr: any[]):any[]{

    return [...new Set(arr)]
  }
  AddPowers() {
    //const PowersArray = this.powersForm.get('Powers') as FormArray;
    console.log(this.selectedOptions);
    console.log(this.selectedPageOpions);
    this.selectedPageOpions=this.removeDuplicates(this.selectedPageOpions)
    console.log(this.selectedPageOpions);
    let user = this.allUsersData.filter((U: any) => U.id == parseInt(this.powersForm.get('UserId')?.value));
    let body = {
      roleId: parseInt(this.powersForm.get('UserId')?.value),
      roleName: user[0].name,
      roleCalims: this.selectedPageOpions,
      statusIds: this.selectedOptions
    }

    console.log(body)
    this.userService.UpdatePowersForRole(body).subscribe({
      next: (res: any) => {
        this.toastr.success("تم تعديل الصلاحيات")
      },
      error: (err: any) => {
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
  getpowers() {
    this._ConttactService.GetStatusCategoryById(94).subscribe(res => {
      this.Powers = res.data.statuses
      console.log(this.Powers);

    })
  }
  getAllPermission() {
    this.userService.GetAllPermission().subscribe((res: any) => {
      this.Permissions = res.data
    })
  }
  //   Touched(parentId: number): boolean {
  //     return this.selectedPageOpions.includes(parentId);
  // }
  isSelected(statusId: number): boolean {
    return this.selectedOptions.includes(statusId);
  }
  isSelectedPage(id: number): boolean {
    let result = this.selectedPageOpions.includes(id)
    return result;
  }
  isSelectedbutton(id: number): boolean {
    let result = this.selectedPageOpions.includes(id)
    return result;
  }
  selectpageOption(event: any, option: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      if (this.selectedPageOpions.indexOf(option.id) === -1) {
        this.selectedPageOpions.push(option.id)
        this.selectedPageOpions=this.removeDuplicates(this.selectedPageOpions)
      }
    } else {
      const index = this.selectedPageOpions.indexOf(option.id);
      if (index !== -1) {
        this.selectedPageOpions.splice(index, 1);
      }
    }


  }
  selectOption(event: any, option: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (this.selectedOptions.indexOf(option.statusId) === -1) {
        this.selectedOptions.push(option.statusId);
      }
    } else {
      const index = this.selectedOptions.indexOf(option.statusId);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);

      }
    }
    console.log(this.selectedOptions);
  }
  getPowersForRole() {
    this._ConttactService.GetFinalStatusOfRole(this.powersForm.get('UserId')?.value).subscribe({
      next: (res: any) => {
        this.dataToPatch = res.data;

        this.dataToPatch.forEach(Power => {
          this.selectedOptions.push(Power.statusId)

        })
        this.GetPermissionsOfRole(this.powersForm.get('UserId')?.value)
      }
    })

  }
  GetPermissionsOfRole(id: any) {
    this.userService.GetPermissionsOfRole(id).subscribe({
      next: (res: any) => {
        this.pagesRoleToPatch = res.data;
        this.pagesRoleToPatch.forEach(power => {
          this.selectedPageOpions.push(power.id)
        })
      }
    })
    this.selectedPageOpions=this.removeDuplicates(this.selectedPageOpions)
    console.log("GetPermissionsOfRole", this.selectedPageOpions);

  }
}
