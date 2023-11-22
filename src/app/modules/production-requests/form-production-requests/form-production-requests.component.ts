import {Component, OnInit, HostListener} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuotationsService} from '../../quotations/quotations.service';
import {ClientsService} from '../../clients/clients.service';
import {Clients, DataClients} from '../../clients/modal/clients';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductionRequestsService} from '../production-requests.service';

@Component({
  selector: 'app-form-production-requests',
  templateUrl: './form-production-requests.component.html',
  styleUrls: ['./form-production-requests.component.scss']
})
export class FormProductionRequestsComponent {
  AddProductionRequestsForm!: FormGroup;
  allClients: DataClients[] = [];
  clientFileTypes: any = [
    {
      name: 'المطابخ',
      id: 1
    },
    {
      name: 'الابواب',
      id: 2
    },
    {
      name: 'خزائن الحائط',
      id: 4
    },
    {
      name: 'الاعمال الخشبية',
      id: 6
    },
  ]
  myArray: any = [];
  myArrayAsForm: any = [];
  loadPriceOffer: any;
  newLoadPriceOffer: any = [];
  fileTypeId: any;
  clientFileId: any;
  loadPriceOfferList: any = [];


  constructor(
    private _FormBuilder: FormBuilder,
    private _productionRequestsService: ProductionRequestsService,
    private _ClientsService: ClientsService,
    private toastr: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _Router: Router
  ) {
    this.AddProductionRequestsForm = this.initProductionRequestsForm();
    let fileTypeId: any = _activatedRoute.snapshot.queryParamMap.get('fileTypeId')
    let clientFileId: any = _activatedRoute.snapshot.queryParamMap.get('clientFileId')
    this.fileTypeId = +fileTypeId
    this.clientFileId = +clientFileId
    if (fileTypeId) {
      this.AddProductionRequestsForm.patchValue({
        fileTypeId: +fileTypeId
      });
    }
  }

  initProductionRequestsForm(): FormGroup {
    return this._FormBuilder.group({
      clientId: [null, [Validators.required]],
      notes: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      contractDate: [null, [Validators.required]],
      fileTypeId: [1, [Validators.required]],
      items: this._FormBuilder.array([]),
      items1: this._FormBuilder.group({
        itemId: [null, [Validators.required]],
        itemTypeId: [3, [Validators.required]],
        itemCount: [null, [Validators.required]],
        notes: [null],
        categoryId: null
      })
    })
  }

  ProductionRequestsFormGroup(): FormGroup {
    return this._FormBuilder.group({
      itemId: [null, [Validators.required]],
      categoryIds: [null],
      defaultDesc: [null],
      itemTypeId: [4, [Validators.required]],
    })
  }

  setClient(e: any){
    if (this.fileTypeId) {
      let client ;
      client = this.allClients.filter((ele)=> ele.clientId == e)[0]
      this.AddProductionRequestsForm.patchValue({
        phoneNumber: client.mobile,
        address: client.email,
      })
    } else {
      this.AddProductionRequestsForm.patchValue({
        phoneNumber: e.mobile,
        address: e.email,
      })
    }

  }
  addAccessoriesItem() {
    this.myArrayAsForm.push(this.itemsForm)
    this.myArray.push({
      itemId: this.itemsForm.get('itemId')?.value,
      itemCount: this.itemsForm.get('itemCount')?.value,
      itemTypeId: this.itemsForm.get('itemTypeId')?.value,
      notes: this.itemsForm.get('notes')?.value,
      categoryId: this.itemsForm.get('categoryId')?.value,
      unit: this.loadPriceOffer['accessories']?.statuses.filter((item: any) => item.statusId == this.itemsForm.get('itemId')?.value)[0]?.description,
    })
  }

  get itemsFormArray() {
    return this.AddProductionRequestsForm.controls["items"] as FormArray;
  }

  get itemsForm() {
    return this.AddProductionRequestsForm.controls["items1"]
  }

  addItemsFormArray() {
    this.itemsFormArray.push(this.ProductionRequestsFormGroup());
  }

  deleteAccessories(index: number) {
    this.myArrayAsForm.splice(index, 1);
    this.myArray.splice(index, 1);
  }

  LoadProductionRequests() {
    this._productionRequestsService.getLoadProductionRequests().subscribe({
      next: (res: any) => {
        this.loadPriceOfferList = []
        this.loadPriceOffer = res.data
        let dataMap:any = {...res.data};
        delete dataMap.accessories;
        Object.entries(dataMap).forEach(([key, value], index) => {
          // if (key != 'accessories') {
            this.addItemsFormArray();
            this.loadPriceOfferList.push({
              key: key,
              defaultDesc: res.data[key]?.defaultDesc,
            })
            this.itemsFormArray.controls[index]?.patchValue({
              itemTypeId: 4,
              categoryIds: res.data[key]?.statusCategoryId,
              defaultDesc: res.data[key]?.defaultDesc,
            })
          // }else{
          //   index--
          // }
          if (this.clientFileId) {
            this.newLoadPriceOffer.push(value)
          }
        })
        if (this.clientFileId) {
          this.ProductionRequestsById(this.clientFileId)
        }
      }
    })
  }
  ProductionRequestsById(id: number) {
    this._productionRequestsService.GetProductionRequestsByIdApi(id).subscribe({
      next: (res: any) => {
        let year, month, day;
        let contractDate = new Date(res.data.contractDate).toLocaleString().split(',')[0]
        year = contractDate.split('/')[2]
        month = contractDate.split('/')[0]
        day = contractDate.split('/')[1]
        let newContractDate = (year)+'-'+(+month < 10 ? '0'+month : month )+'-'+(+day < 10 ? '0'+day : day )
        console.log(newContractDate)
        let itemsMap:any[] = res.data.items.filter((item:any) => item.itemId != null)
        this.AddProductionRequestsForm.patchValue({
          clientId: res.data.client.clientId,
          contractDate: newContractDate,
        });
        itemsMap.forEach((ele: any) => {
          if (ele.itemTypeId == 4) {
            let index = this.newLoadPriceOffer.findIndex((secEle: any) => ele?.parentCategoryId == secEle?.statusCategoryId)
            if (index != -1) {
              this.itemsFormArray.controls[index]?.patchValue({
                itemId: ele.itemId,
              })
            }
          } else if (ele.itemTypeId == 3) {
            this.myArrayAsForm.push(
              this._FormBuilder.group({
                itemId: ele.itemId,
                itemCount: ele.itemCount,
                itemTypeId: 3,
                itemPrice: ele.itemPrice,
                notes: ele.notes,
                categoryId: ele.parentCategoryId
              })
            )
            this.myArray.push({
              itemId: ele.itemId,
              itemCount: ele.itemCount,
              itemTypeId: 3,
              itemPrice: ele.itemPrice,
              notes: ele.notes,
              categoryId: ele.parentCategoryId,
              unit: this.loadPriceOffer['accessories']?.statuses.filter((item: any) => item.statusId == ele.itemId,)[0]?.description,
            })
          }
        })
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
    this.LoadProductionRequests();
    this.GetAllClients();
  }

  AddProductionRequests() {
    for (let i = 0; i < this.myArrayAsForm.length; i++) {
      this.itemsFormArray.push(this.myArrayAsForm[i])
    }
    if (!this.clientFileId) {
      this._productionRequestsService.AddProductionRequests(this.AddProductionRequestsForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(`${res.message}`);
          this._Router.navigateByUrl('/production-requests')
        }, error: (err: any) => {
          this.toastr.error(`${err.message}`);
        }
      })
    } else {
      this._productionRequestsService.EditProductionRequests(this.AddProductionRequestsForm.value,  this.clientFileId).subscribe({
        next: (res: any) => {
          this.toastr.success(`${res.message}`);
          // this._Router.navigateByUrl('/production-requests')
        }, error: (err: any) => {
          this.toastr.error(`${err.message}`);
        }
      })
    }
  }
}
