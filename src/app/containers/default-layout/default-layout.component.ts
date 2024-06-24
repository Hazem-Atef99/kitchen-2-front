import { INavData } from '@coreui/angular';
import { Component } from '@angular/core';

import { nav } from './_nav';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})

export class DefaultLayoutComponent {
  public navItems :INavData[]=[];
  constructor(private nav:nav){
    this.fetchFilteredNavItems();
  }

  ngOnInit(): void {
    console.log("navitems",this.navItems);

  }
  fetchFilteredNavItems(): void {
    this.nav.getFilteredNavItems()
      .then(filteredNavItems => {
        filteredNavItems.forEach(item=>{
          this.navItems.push(item)
        })
        console.log("Filtered navItems:", filteredNavItems);
      })
      .catch(error => {
        console.error("Error fetching and filtering navItems:", error);
      });
  }
}
