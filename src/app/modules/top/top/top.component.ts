import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TopService } from './../top.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  query: any = {
    PageType: 4,
    fileTypeId: null,
  }
allTopList:any []=[]
  constructor(private topService:TopService,
              private toastr:ToastrService) {


  }
  ngOnInit(): void {
    this.getTopList();
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

}
