import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { ContractService } from '../contract/contract.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  listOfCategories:any[]=[
    {
      icon:'1',
      description: "عرض السعر",
      name:'عروض الاسعار',
      link:'quotations'

    },
    {
      icon:'4',
      description: "عقد",
      name:'العقد',
      link:'contract'

    },
    {
      icon:'5',
      description:"طلب انتاج " ,
      name:'طلبات الانتاج',
      link:'production-requests'

    },
    {
      icon:'2',
      description:"المتابعات" ,
      name:'المتابعات',
      link:'follows'

    },
    // {
    //   icon:'3',
    //   description: ,
    //   name:'الملاحظات',
    //   link:''

    // },


    {
      icon:'6',
      description:"الصيانه" ,
      name:'الصيانة',
      link:''

    },
    {
      icon:'7',
      description: "التحليل",
      name:'التحليل',
      link:''

    },
    {
      icon:'8',
      description: "محضر الاستقبال",
      name:'محضر استقبال',
      link:'reception-report'

    },
    {
      icon:'9',
      description: " التوب",
      name:'التوب',
      link:'top'

    },
    {
      icon:'10',
      description: "سندات القبض",
      name:'سندات القبض',
      link:'client-payment'

    },
    {
      icon:'11',
      description: "التقارير",
      name:'التقارير',
      link:''

    },
    {
      icon:'12',
      description:"التوصيلات الصحيه",
      name:'توصيلات صحية',
      link:'sanitaryConnections'

    },
    // {
    //   icon:'13',
    //   description: ,
    //   name:'النواقص',
    //   link:''

    // },
  ]
pagesToShow :any[]=[];
pagesDescrptions :any[]=[];
selectedPageOpions: any[] = [];
  dataToPatch: any[] = [];
  pagesRoleToPatch: any[] = [];
  constructor(private _userService:UsersService,
              private _ConttactService:ContractService) {

  }
  ngOnInit(): void {
    this.getPages();
    this.GetPermissionsOfRole(1);
  }
  getPages(){
    this._userService.GetPermissionsOfRole(1).subscribe({
      next:(res:any)=>{
        this.pagesToShow=res.data
        this.pagesToShow = this.pagesToShow.filter(item=>item.isMainPage===true)
     for (let i = 0; i < this.pagesToShow.length; i++) {
      this.pagesDescrptions[i] = this.pagesToShow[i].description;
     }
    }}
    )
    console.log(this.pagesDescrptions);
  }

  GetPermissionsOfRole(id: any) {
    this._userService.GetPermissionsOfRole(id).subscribe({
      next: (res: any) => {
        this.pagesRoleToPatch = res.data;
        this.pagesRoleToPatch.forEach(power => {
          this.selectedPageOpions.push(power.id)
        })
      }
    })
    this.selectedPageOpions=this.removeDuplicates(this.selectedPageOpions)
    console.log("GetPermissionsOfRole", this.selectedPageOpions);
    //localStorage.setItem("PermissionsOfRole",this.selectedPageOpions.toString())

  }
  isAuthurized(desc : string) : boolean {
    return this.pagesDescrptions.includes(desc)
  }
  removeDuplicates(arr: any[]):any[]{

    return [...new Set(arr)]
  }
}
