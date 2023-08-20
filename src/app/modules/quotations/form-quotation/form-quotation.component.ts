import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuotationsService } from '../quotations.service';

@Component({
  selector: 'app-form-quotation',
  templateUrl: './form-quotation.component.html',
  styleUrls: ['./form-quotation.component.scss']
})
export class FormQuotationComponent implements OnInit {
  AddClientFileForm!: FormGroup;
  ListOfItems: any[] = [
    {
      name: 'الجرانيت',
      value: 'garanet',
      itemTypeId:4,
      id: 16
    },
    {
      name: 'المجلى',
      value: 'magla',
      itemTypeId:4,
      id: 12
    },
    {
      name: 'البانيل',
      value: 'panel',
      itemTypeId:4,
      id: 15
    },
    {
      name: 'حفرة المجلى',
      value: 'maglaHole',
      itemTypeId:4,
      id: 13
    },
    {
      name: 'تصفيح الجدران من التوب',
      value: 'platingTopWall',
      itemTypeId:4,
      id: 227
    },
    {
      name: 'سترب خارجي',
      value: 'outerStrop',
      itemTypeId:4,
      id: 83
    },
    {
      name: 'نوع الايادي',
      value: 'handType',
      itemTypeId:4,
      id: 9
    },
    {
      name: 'الشفاط',
      value: 'shafat',
      itemTypeId:4,
      id: 23
    },
    {
      name: 'تسميك التوب',
      value: 'thickeningTop',
      itemTypeId:4,
      id: 276
    },
    {
      name: 'البطارية',
      value: 'batery',
      itemTypeId:4,
      id: 14
    },
    {
      name: 'الكورنيش',
      value: 'corniche',
      itemTypeId:4,
      id: 178
    },
    {
      name: 'توصيلات صحية',
      value: 'healthLinking',
      itemTypeId:4,
      id: 274
    },
    {
      name: 'الانارة',
      value: 'lighting',
      itemTypeId:4,
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
      name: 'الوحدات',
      value: 'unites',
      id: 1,
      itemTypeId: 1
    },
    {
      name: 'الاضافات',
      accessories: {
        name: '',
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
    private _QuotationsService: QuotationsService
  ) {
    this.AddClientFileForm = this.initClientFileForm();
    this.ListOfItems.forEach((ele: any, index: number) => {
      this.addItemsFormArray();
      this.itemsFormArray.controls[index].patchValue({
        categoryId: ele.id,
        itemTypeId: ele.itemTypeId
      })
    })
  }
  initClientFileForm(): FormGroup {
    return this._FormBuilder.group({
      clientId: [0, [Validators.required]],
      deviceNotes: ['', [Validators.required]],
      fileTypeId: [0, [Validators.required]],
      additionaldiscount: [0, [Validators.required]],
      items: this._FormBuilder.array([])
    })
  }
  ClientFileFormGroup(): FormGroup {
    return this._FormBuilder.group({
      itemId: [0, [Validators.required]],
      itemCount: [0, [Validators.required]],
      itemTypeId: [0, [Validators.required]],
      itemPrice: [0],
      notes: [0],
      categoryId: [0]
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
  ngOnInit(): void {
    this.LoadPriceOffer()
    this.GetUnitsItemsbyCategory()
  }
  onSubmit() {
    console.log(this.AddClientFileForm.value);

  }
}