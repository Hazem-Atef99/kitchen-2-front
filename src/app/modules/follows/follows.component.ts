import { FollowsService } from './follows.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit {
  query: any = {
    PageType: 4,
    fileTypeId: null,
  }
  allfollows :any[]=[];
  constructor(private followsService:FollowsService) {

  }
  ngOnInit(): void {
  }
  addTop(){

  }
  getClientInfo(clientId:any){

  }
  filter(event: any) {
    console.log(event.value);
    event.value ? this.query['fileTypeId'] = event.value : this.query['fileTypeId'] = null;
    // this.getTopList();
  }
  GetAllFollowUp(){
    this.followsService.GetAllFollows().subscribe({next:(res:any)=>{
      this.allfollows=res.data
    }})
  }
}
