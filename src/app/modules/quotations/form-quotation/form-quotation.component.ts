import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuotationsService } from '../quotations.service';
import { ClientsService } from '../../clients/clients.service';
import { Clients, DataClients } from '../../clients/modal/clients';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-quotation',
  templateUrl: './form-quotation.component.html',
  styleUrls: ['./form-quotation.component.scss']
})
export class FormQuotationComponent implements OnInit {
  AddClientFileForm!: FormGroup;
  allClients: DataClients[] = [];

  ListOfItems: any[] = [
    {
      x: 1,
      name: 'الجرانيت',
      value: 'garanet',
      itemTypeId: 4,
      id: 16
    },
    {
      x: 1,
      name: 'المجلى',
      value: 'magla',
      itemTypeId: 4,
      id: 12
    },
    {
      x: 1,
      name: 'البانيل',
      value: 'panel',
      itemTypeId: 4,
      id: 15
    },
    {
      x: 1,
      name: 'حفرة المجلى',
      value: 'maglaHole',
      itemTypeId: 4,
      id: 13
    },
    {
      x: 1,
      name: 'تصفيح الجدران من التوب',
      value: 'platingTopWall',
      itemTypeId: 4,
      id: 227
    },
    {
      x: 1,
      name: 'سترب خارجي',
      value: 'outerStrop',
      itemTypeId: 4,
      id: 83
    },
    {
      x: 1,
      name: 'نوع الايادي',
      value: 'handType',
      itemTypeId: 4,
      id: 9
    },
    {
      x: 1,
      name: 'الشفاط',
      value: 'shafat',
      itemTypeId: 4,
      id: 23
    },
    {
      x: 1,
      name: 'تسميك التوب',
      value: 'thickeningTop',
      itemTypeId: 4,
      id: 276
    },
    {
      x: 1,
      name: 'البطارية',
      value: 'batery',
      itemTypeId: 4,
      id: 14
    },
    {
      x: 1,
      name: 'الكورنيش',
      value: 'corniche',
      itemTypeId: 4,
      id: 178
    },
    {
      x: 1,
      name: 'توصيلات صحية',
      value: 'healthLinking',
      itemTypeId: 4,
      id: 274
    },
    {
      x: 1,
      name: 'الانارة',
      value: 'lighting',
      itemTypeId: 4,
      id: 275
    },
    // {
    //   name: 'تصفيح خشب ',
    //   value:'',
    //   id: 96
    // },
    // {
    //   name: 'متطلبات العميل',
    //   value:'',
    //   id: 0
    // },

    // ======================
    {
      x: 0,
      name: 'الوحدات',
      units: {
        name: 'الوحدة',
        value: 'unit',
        id: 1,
        itemTypeId: 1
      },
      value: 'unites',
      id: 1,
      itemTypeId: 1
    },
    {
      x: 0,
      name: 'اضافات',
      accessories: {
        name: 'الاكسسوارات',
        value: 'accessories',
        id: 3,
        itemTypeId: 3
      },
      value: 'accessories',
      id: 3,
      itemTypeId: 3
    },
  ]
  loadPriceOffer: any;
  UnitsItemsbyCategory: any;
  constructor(
    private _FormBuilder: FormBuilder,
    private _QuotationsService: QuotationsService,
    private _ClientsService: ClientsService,
    private toastr: ToastrService,
    private _Router: Router
  ) {
    this.AddClientFileForm = this.initClientFileForm();
    this.ListOfItems.forEach((ele: any, index: number) => {
      // ele.id == 1 ?  this.ClientFileFormGroup().addControl('categoryId', new FormControl(null)) : console.log(index);
      this.addItemsFormArray();
      this.itemsFormArray.controls[index].patchValue({
        itemTypeId: ele.itemTypeId
      })
    })
  }
  initClientFileForm(): FormGroup {
    return this._FormBuilder.group({
      clientId: [null, [Validators.required]],
      deviceNotes: ['', [Validators.required]],
      fileTypeId: [null, [Validators.required]],
      additionaldiscount: [null, [Validators.required]],
      items: this._FormBuilder.array([])
    })
  }
  ClientFileFormGroup(): FormGroup {
    return this._FormBuilder.group({
      itemId: [null, [Validators.required]],
      itemCount: [null, [Validators.required]],
      itemTypeId: [null, [Validators.required]],
      itemPrice: [null],
      notes: [null],
      categoryId: null
    })
  }
  get itemsFormArray() {
    return this.AddClientFileForm.controls["items"] as FormArray;
  }

  addItemsFormArray() {
    this.itemsFormArray.push(this.ClientFileFormGroup());
  }
  deleteItemsFormArray(index: number) {
    this.itemsFormArray.removeAt(index);
  }
  LoadPriceOffer() {
    this._QuotationsService.LoadPriceOffer().subscribe({
      next: (res: any) => {
        this.loadPriceOffer = res.data
      }
    })
  }
  GetUnitsItemsbyCategory() {
    this._QuotationsService.GetUnitsItemsbyCategory().subscribe({
      next: (res: any) => {
        this.UnitsItemsbyCategory = res.data
      }
    })
  }
  GetAllClients() {
    this._ClientsService.GetAllClients().subscribe({
      next: (res: Clients) => {
        this.allClients = res.data
      }
    })
  }
  ngOnInit(): void {
    this.LoadPriceOffer();
    this.GetUnitsItemsbyCategory();
    this.GetAllClients();
    console.log(this.AddClientFileForm.value);

  }
  AddClientFile() {
    console.log(this.AddClientFileForm.value);
    this._QuotationsService.AddClientFile(this.AddClientFileForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(`${res.message}`);
        this._Router.navigateByUrl('/quotations')
      }, error: (err: any) => {
        this.toastr.error(`${err.message}`);
      }
    })
  }
}