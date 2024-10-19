import { Component } from '@angular/core';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.scss']
})
export class ReportsHomeComponent {
  icons = [
    { icon: '4', label: 'العقود',link:'contractReport' },
    { icon: 'assets/icons/follows-icon.png', label: 'المتابعات',link:'' },
    { icon: 'assets/icons/kitchen-icon.png', label: 'حالة المطبخ',link:'' },
    { icon: 'assets/icons/maintenance-icon.png', label: 'الصيانة',link:'' },
    { icon: 'assets/icons/notes-icon.png', label: 'الملاحظات',link:'' },
    { icon: 'assets/icons/filter-icon.png', label: 'النواقص',link:'' },
    { icon: 'assets/icons/account-icon.png', label: 'كشف حساب',link:'' },
    { icon: 'assets/icons/receipt-icon.png', label: 'سندات القبض',link:'' },
    { icon: 'assets/icons/tax-icon.png', label: 'ضريبة المبيعات' ,link:''},
    { icon: 'assets/icons/calendar-icon.png', label: 'تاريخ التركيب',link:'' }
  ];

  constructor() {

  }
}
