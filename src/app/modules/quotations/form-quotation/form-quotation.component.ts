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
  myArray1: any = [];
  myArray2: any = [];
  myViewArray1: any = [];
  myViewArray2: any = [];
  ListOfItems: any = [
    {
      isCount: true,
      x: 1,
      name: 'الجرانيت',
      value: 'garanet',
      itemTypeId: 4,
      id: 16
    },
    {
      isCount: false,
      x: 1,
      name: 'المجلى',
      value: 'magla',
      itemTypeId: 4,
      id: 12
    },
    {
      isCount: true,
      x: 1,
      name: 'البانيل',
      value: 'panel',
      itemTypeId: 4,
      id: 15
    },
    {
      isCount: false,
      x: 1,
      name: 'حفرة المجلى',
      value: 'maglaHole',
      itemTypeId: 4,
      id: 13
    },
    {
      isCount: true,
      x: 1,
      name: 'تصفيح الجدران من التوب',
      value: 'platingTopWall',
      itemTypeId: 4,
      id: 227
    },
    {
      isCount: false,
      x: 1,
      name: 'سترب خارجي',
      value: 'outerStrop',
      itemTypeId: 4,
      id: 83
    },
    {
      isCount: true,
      x: 1,
      name: 'نوع الايادي',
      value: 'handType',
      itemTypeId: 4,
      id: 9
    },
    {
      isCount: false,
      x: 1,
      name: 'الشفاط',
      value: 'shafat',
      itemTypeId: 4,
      id: 23
    },
    {
      isCount: true,
      x: 1,
      name: 'تسميك التوب',
      value: 'thickeningTop',
      itemTypeId: 4,
      id: 276
    },
    {
      isCount: false,
      x: 1,
      name: 'البطارية',
      value: 'batery',
      itemTypeId: 4,
      id: 14
    },
    {
      isCount: true,
      x: 1,
      name: 'الكورنيش',
      value: 'corniche',
      itemTypeId: 4,
      id: 178
    },
    {
      isCount: false,
      x: 1,
      name: 'توصيلات صحية',
      value: 'healthLinking',
      itemTypeId: 4,
      id: 274
    },
    {
      isCount: true,
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
      items: this._FormBuilder.array([]),
      items1: this._FormBuilder.group({
        itemId: [null, [Validators.required]],
        itemCount: [1, [Validators.required]],
        itemTypeId: [1, [Validators.required]],
        itemPrice: [null],
        eachItemPrice: [null],
        notes: [null],
        categoryId: null
      }),
      items2: this._FormBuilder.group({
        itemId: [null, [Validators.required]],
        itemCount: [1, [Validators.required]],
        itemTypeId: [3, [Validators.required]],
        itemPrice: [null],
        eachItemPrice: [null],
        notes: [null],
        categoryId: null
      })
    })
  }
  ClientFileFormGroup(): FormGroup {
    return this._FormBuilder.group({
      itemId: [null, [Validators.required]],
      itemCount: [1, [Validators.required]],
      itemTypeId: [4, [Validators.required]],
      itemPrice: [null],
      eachItemPrice: [null],
      notes: [null],
      categoryId: null
    })
  }
  setPrice(e: any, i: number) {
    console.log(e.target.value)
    let price = 0
    price = this.loadPriceOffer[this.ListOfItems[i].value]?.statuses.filter((ele: any)=> ele.statusId == e.target.value)[0].price
    console.log(price)
    this.itemsFormArray.controls[i]?.get('eachItemPrice')?.patchValue(price)
  }
  getPrice(i: number) {
    let totPrice = 0
    totPrice = (this.itemsFormArray.controls[i]?.get('eachItemPrice')?.value * this.itemsFormArray.controls[i]?.get('itemCount')?.value)
    this.itemsFormArray.controls[i]?.get('itemPrice')?.patchValue(totPrice)
  }
  setPrice1(e: any) {
    console.log(e.target.value)
    let price = 0
    price = this.loadPriceOffer['unites']?.statuses.filter((ele: any)=> ele.statusId == e.target.value)[0].price
    console.log(price)
    this.items1Form.get('eachItemPrice')?.patchValue(price)
  }
  getPrice1() {
    let totPrice = 0
    totPrice = (this.items1Form.get('eachItemPrice')?.value * this.items1Form.get('itemCount')?.value)
    this.items1Form.get('itemPrice')?.patchValue(totPrice)
  }
  setPrice2(e: any) {
    console.log(e.target.value)
    let price = 0
    price = this.loadPriceOffer['accessories']?.statuses.filter((ele: any)=> ele.statusId == e.target.value)[0].price
    console.log(price)
    this.items2Form.get('eachItemPrice')?.patchValue(price)
  }
  getPrice2() {
    let totPrice = 0
    totPrice = (this.items2Form.get('eachItemPrice')?.value * this.items2Form.get('itemCount')?.value)
    this.items2Form.get('itemPrice')?.patchValue(totPrice)
  }

  addUnitItem() {
    this.myArray1.push({
      itemId: this.items1Form.get('itemId')?.value,
      itemCount: this.items1Form.get('itemCount')?.value,
      itemTypeId: this.items1Form.get('itemTypeId')?.value,
      itemPrice: this.items1Form.get('itemPrice')?.value,
      eachItemPrice: this.items1Form.get('eachItemPrice')?.value,
      notes: this.items1Form.get('notes')?.value,
      categoryId: this.items1Form.get('categoryId')?.value
    })
    console.log(this.myArray1)
    let arr = []
    for (let i = 0 ; i < this.myArray1.length; i++){
      arr.push({
        unit: this.loadPriceOffer['unites']?.statuses.filter((item: any) => item.statusId == this.myArray1[i].itemId )[0].description,
        unit2: this.UnitsItemsbyCategory?.statuses.filter((item: any) => item.statusId == this.myArray1[i].categoryId )[0].description,
        price: this.myArray1[i].itemPrice,
        count: this.myArray1[i].itemCount,
        note: this.myArray1[i].notes,
      })
    }
    this.myViewArray1 = arr
    console.log(arr)
  }
  addAccessoriesItem() {
    this.myArray2.push({
      itemId: this.items2Form.get('itemId')?.value,
      itemCount: this.items2Form.get('itemCount')?.value,
      itemTypeId: this.items2Form.get('itemTypeId')?.value,
      itemPrice: this.items2Form.get('itemPrice')?.value,
      eachItemPrice: this.items2Form.get('eachItemPrice')?.value,
      notes: this.items2Form.get('notes')?.value,
      categoryId: this.items2Form.get('categoryId')?.value
    })
    console.log(this.myArray2)
    let arr = []
    for (let i = 0 ; i < this.myArray2.length; i++){
      arr.push({
        unit: this.loadPriceOffer['accessories']?.statuses.filter((item: any) => item.statusId == this.myArray2[i].itemId )[0].description,
        unit2: this.UnitsItemsbyCategory?.statuses.filter((item: any) => item.statusId == this.myArray2[i].categoryId )[0].description,
        price: this.myArray2[i].itemPrice,
        count: this.myArray2[i].itemCount,
        note: this.myArray2[i].notes,
      })
    }
    this.myViewArray2 = arr
    console.log(arr)
  }
  get itemsFormArray() {
    return this.AddClientFileForm.controls["items"] as FormArray;
  }
  get items1Form() {
    return this.AddClientFileForm.controls["items1"]
  }
  get items2Form() {
    return this.AddClientFileForm.controls["items2"]
  }

  addItemsFormArray() {
    this.itemsFormArray.push(this.ClientFileFormGroup());
  }
  deleteItemsFormArray(index: number) {
    this.itemsFormArray.removeAt(index);
  }
  deleteUnits(index: number) {
    this.myArray1.splice(index, 1);
    this.myViewArray1.splice(index, 1);
  }
  deleteAccessories(index: number) {
    this.myArray2.splice(index, 1);
    this.myViewArray2.splice(index, 1);
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
    for (let i = 0; i < this.myArray1.length; i++){
      this.itemsFormArray.push(this.myArray1[i])
    }
    for (let i = 0; i < this.myArray2.length; i++){
      this.itemsFormArray.push(this.myArray2[i])
    }
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
