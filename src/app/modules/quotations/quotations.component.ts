import { Component } from '@angular/core';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent {
 today:Date = new Date()
}
