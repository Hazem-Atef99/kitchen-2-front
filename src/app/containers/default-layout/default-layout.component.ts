import { Component } from '@angular/core';

import { navItems } from './_nav';
import { UsersService } from 'src/app/modules/users/users.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  pages :any[]=[];
  pagesToShow :any[]=[];
  pagesDescrptions :any[]=[];
  constructor(private _userService:UsersService) {
    navItems.forEach(item=>{
      this.pages.push(item.description)
    })


  }
  ngOnInit(): void {
    this.getPages();
    this.pagesDescrptions = this.pagesDescrptions.filter(item => item !== "");
    for (let i = this.navItems.length; i = 0; i--) {
      this.navItems.pop();

    }
    this.pagesDescrptions.forEach(item=>{
      this.navItems.push(item)
    })
    console.log(this.pagesDescrptions);
  }
  getPages(){
    this._userService.GetPermissionsOfRole(1).subscribe({
      next:(res:any)=>{
        this.pagesToShow=res.data

        this.pagesToShow = this.pagesToShow.filter(item=>item.isMainPage===true)

        console.log(this.pagesToShow);
        for (let i = 0; i < this.pagesToShow.length; i++) {
      this.pagesDescrptions[i] =this.pages.includes(this.pagesToShow[i].description)?navItems[i]:'';

     }
    }}

    )



    console.log(this.pagesDescrptions);

    console.log(this.pages);

  }
  // isAuthurized(desc : string) : boolean {
  //   return this.pagesDescrptions.includes(desc)
  // }
}
