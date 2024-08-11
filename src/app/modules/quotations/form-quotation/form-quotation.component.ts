import {Component, OnInit, HostListener} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuotationsService} from '../quotations.service';
import {ClientsService} from '../../clients/clients.service';
import {Clients, DataClients} from '../../clients/modal/clients';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';


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
  myArrayAsForm1: any = [];
  myArrayAsForm2: any = [];
  myViewArray1: any = [];
  fileTypeId: any;
  clientFileId: any;
  myViewArray2: any = [];
  unitsCounts: number = 0;
  accessoriesCount: number = 0;
  TopCount: number = 0;
  clientsForm!:FormGroup;
  mobile:string="";
  clientFormvisible=false;
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
      id: 277
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
  clientFileTypes: any = [
    {
      name: 'المطابخ',
      id: 1
    },
    // {
    //   name: 'الابواب',
    //   id: 2
    // },
    // {
    //   name: 'خزائن الحائط',
    //   id: 4
    // },
    // {
    //   name: 'الاعمال الخشبية',
    //   id: 6
    // },
  ]
  loadPriceOffer: any;
  UnitsItemsbyCategory: any=[];

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    this.countTotal()
  }

  countTotal() {
    let count = 0;
    for (let i = 0; i < this.itemsFormArray.controls.length; i++) {
      count += this.itemsFormArray.controls[i]?.get('itemPrice')?.value

    }
    this.TopCount = count
    let count1 = 0;
    for (let i = 0; i < this.myArrayAsForm1.length; i++) {
      count1 +=  this.myArrayAsForm1[i]?.get('itemPrice')?.value
    }
    this.unitsCounts = count1
    let count2 = 0;
    for (let i = 0; i < this.myArrayAsForm2.length; i++) {
      count2 += this.myArrayAsForm2[i]?.get('itemPrice')?.value
    }
    this.accessoriesCount = count2
  }

  constructor(
    private _FormBuilder: FormBuilder,
    private _QuotationsService: QuotationsService,
    private _ClientsService: ClientsService,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _Router: Router
  ) {
    this.AddClientFileForm = this.initClientFileForm();
    this.clientsForm=this.initClientForm();
    this.ListOfItems.forEach((ele: any, index: number) => {
      this.addItemsFormArray();
      this.itemsFormArray.controls[index].patchValue({
        itemTypeId: ele.itemTypeId
      })
    })
    this.LoadPriceOffer();
    this.GetUnitsItemsbyCategory();
    this.GetAllClients();
    let fileTypeId: any = _activatedRoute.snapshot.queryParamMap.get('fileTypeId')
    let clientFileId: any = _activatedRoute.snapshot.queryParamMap.get('clientFileId')
    this.fileTypeId = +fileTypeId
    this.clientFileId = +clientFileId
    if (fileTypeId) {
      this.AddClientFileForm.patchValue({
        fileTypeId: +fileTypeId
      });
    }
  }
  addClient(){
    this.mobile=this.clientsForm.get('mobile')?.value;
    this.mobile=this.mobile.toString();
    this.clientsForm.get('mobile')?.patchValue(this.mobile)

     this._ClientsService.AddClient(this.clientsForm.value).subscribe({next:(res:any)=>{
       this.toastr.success("تم اضافة الزبون");
       this.GetAllClients();
       this.clientFormvisible=false;
     },error:(err=>{
       this.toastr.error("حدث خطأ");
       this.clientFormvisible=true;
     })});


 }
 initClientForm():FormGroup{
  return this._FormBuilder.group({

    clientName: ['',Validators.required],
    email: ['',Validators.required],
    fax: ['',],
    mobile: ['',Validators.required],
    tel1: ['',],
    clientAddress: ['',Validators.required]
  });
}
  GetClientFileById(id: number) {
    this._QuotationsService.GetClientFileByIdApi(id).subscribe({
      next: (res: any) => {
        this.AddClientFileForm.patchValue({
          clientId: res.data.client.clientId,
          deviceNotes: res.data.deviceNotes,
          additionaldiscount: res.data.additionaldiscount,
          discount: res.data.discount,
          accessoryDiscount: res.data.accessoryDiscount,
        });
        res.data.items.forEach((ele: any) => {
          if (ele.itemTypeId == 4) {
            let index = this.ListOfItems.findIndex((secEle: any) => secEle.id == ele.parentCategoryId)
            this.itemsFormArray.controls[index].patchValue({
              itemId: ele.itemId,
              categoryId: ele.parentCategoryId,
              notes: ele.notes,
              itemPrice: ele.itemPrice,
              itemCount: ele.itemCount,
              itemTypeId: 4,
            })
          } else if (ele.itemTypeId == 1) {
            this.myArrayAsForm1.push(
              this._FormBuilder.group({
                itemId: ele.itemId,
                itemCount: ele.itemCount,
                itemTypeId: 1,
                itemPrice: ele.itemPrice,
                notes: ele.notes,
                categoryId: ele.parentCategoryId
              })
            )
            this.myArray1.push({
              itemId: ele.itemId,
              itemCount: ele.itemCount,
              itemTypeId: 1,
              itemPrice: ele.itemPrice,
              notes: ele.notes,
              categoryId: ele.parentCategoryId,

              unit: this.loadPriceOffer['unites']?.statuses.filter((item: any) => item.statusId == ele.itemId,)[0]?.description,
             // unit2: this.UnitsItemsbyCategory?.filter((item: any) => item.statusId == ele.categoryId)[0]?.description,
               unitName:ele.categoryDesc
            })
          } else if (ele.itemTypeId == 3) {
            this.myArrayAsForm2.push(
              this._FormBuilder.group({
                itemId: ele.itemId,
                itemCount: ele.itemCount,
                itemTypeId: 3,
                itemPrice: ele.itemPrice,
                notes: ele.notes,
                categoryId: ele.parentCategoryId
              })
            )
            this.myArray2.push({
              itemId: ele.itemId,
              itemCount: ele.itemCount,
              itemTypeId: 3,
              itemPrice: ele.itemPrice,
              notes: ele.notes,
              categoryId: ele.categoryId,
              unit: this.loadPriceOffer['accessories']?.statuses.filter((item: any) => item.statusId == ele.itemId,)[0]?.description,
            })
          }
        })
        this.countTotal()
      }
    })
    console.log('My Array2',this.myArray2);
    console.log('My Array1',this.myArray1);
  }

  initClientFileForm(): FormGroup {
    return this._FormBuilder.group({
      clientId: [null, [Validators.required]],
      deviceNotes: ['', [Validators.required]],
      fileTypeId: [null, [Validators.required]],
      additionaldiscount: [0, [Validators.pattern('^[0-9]+([.]\d+)?$')]],
      discount: [0, [Validators.pattern('^[0-9]+([.]\d+)?$')]],
      accessoryDiscount: [0, [Validators.pattern('^[0-9]+([.]\d+)?$')]],
      items: this._FormBuilder.array([]),
      items1: this._FormBuilder.group({
        itemId: [null, [Validators.required]],
        itemCount: [1, [Validators.required]],
        itemTypeId: [1, [Validators.required]],
        itemPrice: [null],
        eachItemPrice: [null],
        notes: [null],
        categoryId: [null, [Validators.required]]
      }),
      items2: this._FormBuilder.group({
        itemId: [null, [Validators.required]],
        itemCount: [1, [Validators.required]],
        itemTypeId: [3, [Validators.required]],
        itemPrice: [null],
        eachItemPrice: [null],
        notes: [null],
        categoryId: [null, [Validators.required]]
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
    let price = 0
    price = this.loadPriceOffer[this.ListOfItems[i].value]?.statuses.filter((ele: any) => ele.statusId == e.statusId)[0].price
    this.itemsFormArray.controls[i]?.get('eachItemPrice')?.patchValue(price)
  }

  getPrice(i: number) {
    let totPrice = 0
    totPrice = (this.itemsFormArray.controls[i]?.get('eachItemPrice')?.value * this.itemsFormArray.controls[i]?.get('itemCount')?.value)
    this.itemsFormArray.controls[i]?.get('itemPrice')?.patchValue(totPrice)
    console.log("price",totPrice);

    // let count = 0
    // for (let i = 0 ; i < this.itemsFormArray.controls.length; i++){
    //   count += this.itemsFormArray.controls[i].get('itemPrice')?.value
    // }
  }

  setPrice1(e: any) {
    let price = 0
    price = this.loadPriceOffer['unites']?.statuses.filter((ele: any) => ele.statusId == e.statusId)[0].price
    this.items1Form.get('eachItemPrice')?.patchValue(price)
  }

  getPrice1() {
    let totPrice = 0
    totPrice = (this.items1Form.get('eachItemPrice')?.value * this.items1Form.get('itemCount')?.value)
    this.items1Form.get('itemPrice')?.patchValue(totPrice)
  }

  setPrice2(e: any) {

    let price = 0
    price = this.loadPriceOffer['accessories']?.statuses.filter((ele: any) => ele.statusId == e.target.value)[0].price
    this.items2Form.get('eachItemPrice')?.patchValue(price)
  }

  getPrice2() {
    let totPrice = 0
    totPrice = (this.items2Form.get('eachItemPrice')?.value * this.items2Form.get('itemCount')?.value)
    this.items2Form.get('itemPrice')?.patchValue(totPrice)
  }

  addUnitItem() {
    this.myArrayAsForm1.push(this.items1Form)
    this.myArray1.push({
      itemId: this.items1Form.get('itemId')?.value,
      itemCount: this.items1Form.get('itemCount')?.value,
      itemTypeId: this.items1Form.get('itemTypeId')?.value,
      itemPrice: this.items1Form.get('itemPrice')?.value,
      eachItemPrice: this.items1Form.get('eachItemPrice')?.value,
      notes: this.items1Form.get('notes')?.value,
      categoryId: this.items1Form.get('categoryId')?.value,
      unit: this.loadPriceOffer['unites']?.statuses.filter((item: any) => item.statusId == this.items1Form.get('itemId')?.value)[0]?.description,
      unitName: this.UnitsItemsbyCategory?.filter((item: any) => item.statusId == this.items1Form.get('categoryId')?.value)[0]?.description,
    })
  }

  addAccessoriesItem() {
    this.myArrayAsForm2.push(this.items2Form)
    this.myArray2.push({
      itemId: this.items2Form.get('itemId')?.value,
      itemCount: this.items2Form.get('itemCount')?.value,
      itemTypeId: this.items2Form.get('itemTypeId')?.value,
      itemPrice: this.items2Form.get('itemPrice')?.value,
      eachItemPrice: this.items2Form.get('eachItemPrice')?.value,
      notes: this.items2Form.get('notes')?.value,
      categoryId: this.items2Form.get('categoryId')?.value,
      unit: this.loadPriceOffer['accessories']?.statuses.filter((item: any) => item.statusId == this.items2Form.get('itemId')?.value)[0]?.description,
    })
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
    this.myArrayAsForm1.splice(index, 1);
    this.myArray1.splice(index, 1);
    this.myViewArray1.splice(index, 1);

  }

  deleteAccessories(index: number) {
    this.myArrayAsForm2.splice(index, 1);
    this.myArray2.splice(index, 1);
    this.myViewArray2.splice(index, 1);

  }

  LoadPriceOffer() {
    this._QuotationsService.LoadPriceOffer().subscribe({
      next: (res: any) => {
        this.loadPriceOffer = res.data
        if (this.clientFileId) {
          this.GetClientFileById(this.clientFileId)
        }
      }
    })
  }

  GetUnitsItemsbyCategory() {
    this._QuotationsService.GetUnitsItemsbyCategory().subscribe({
      next: (res: any) => {
        this.UnitsItemsbyCategory = res.data.statuses.map((status: any) => ({
          ...status,
          description: `${status.defaultDesc} ${status.description}`
        }));
        console.log(this.UnitsItemsbyCategory);
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

  }

  AddClientFile() {
    for (let i = 0; i < this.myArrayAsForm1.length; i++) {
      this.itemsFormArray.push(this.myArrayAsForm1[i])
    }
    for (let i = 0; i < this.myArrayAsForm2.length; i++) {
      this.itemsFormArray.push(this.myArrayAsForm2[i])
    }
    if (!this.clientFileId) {
      this._QuotationsService.AddClientFile(this.AddClientFileForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(`${res.message}`);
          this._Router.navigateByUrl('/quotations')
        }, error: (err: any) => {
          this.toastr.error(`${err.message}`);
         // this._Router.navigateByUrl('/quotations')
        }
      })
    } else {
      this._QuotationsService.EditClientFile(this.AddClientFileForm.value, this.clientFileId).subscribe({
        next: (res: any) => {
          this.toastr.success(`${res.message}`);
          this._Router.navigateByUrl('/quotations')
        }, error: (err: any) => {
          this.toastr.error(`${err.message}`);
          //this._Router.navigateByUrl('/quotations')
        }
      })
    }
  }
}
