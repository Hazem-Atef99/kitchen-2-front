import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TopService } from './../top.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  query: any = {
    PageType: 4,
    fileTypeId: 1,
  }
allTopList:any []=[]
  pagesRoleToPatch: any[] = [];
  selectedPageOpions: any[] = [];
  buttons: any[] = [];
  constructor(private topService:TopService,
              private toastr:ToastrService,
              private userService:UsersService) {


  }
  ngOnInit(): void {
    this.getTopList();
    this.GetPermissionsOfRole(1)
  }
  filter(event: any) {
    console.log(event.value);
    event.value ? this.query['fileTypeId'] = event.value : this.query['fileTypeId'] = null;
     this.getTopList();
  }
  getTopList(){
    this.topService.getTopList().subscribe((res:any)=>{
      console.log(res.data);
      this.allTopList=res.data
    })
  }
  deleteTop(id:any){
    this.topService.DeletTop(id).subscribe(res=>{
      this.toastr.success("deleted")
      this.getTopList()
    },err=>{
      this.toastr.error("not")
    })
  }
  GetPermissionsOfRole(id: any) {
    this.userService.GetPermissionsOfRole(id).subscribe({
      next: (res: any) => {
        this.pagesRoleToPatch = res.data;
        this.pagesRoleToPatch.forEach(power => {
          this.selectedPageOpions.push(power.id)
          power.pagesAndButtons.forEach((element:any )=> {
            this.buttons.push(element.id)
          });
        })
      }
    })
    this.selectedPageOpions=this.removeDuplicates(this.selectedPageOpions)
    console.log("GetPermissionsOfRole", this.selectedPageOpions);
    console.log("buttons", this.buttons);
  }
  removeDuplicates(arr: any[]):any[]{

    return [...new Set(arr)]
  }
  isAuthorized(permissionId:number) : boolean{
    return this.buttons.includes(permissionId)
  }
}
