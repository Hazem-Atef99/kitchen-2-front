import {Component, OnInit, HostListener} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuotationsService} from '../../quotations/quotations.service';
import {ClientsService} from '../../clients/clients.service';
import {Clients, DataClients} from '../../clients/modal/clients';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
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
  loadPriceOfferList: any = [];


  constructor(
    private _FormBuilder: FormBuilder,
    private _productionRequestsService: ProductionRequestsService,
    private _ClientsService: ClientsService,
    private toastr: ToastrService,
    private _Router: Router
  ) {
    this.AddProductionRequestsForm = this.initProductionRequestsForm();
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
      itemTypeId: [4, [Validators.required]],
      categoryId: null
    })
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
        Object.entries(res.data).forEach(([key, value], index) => {
          if (key != 'accessories') {
            this.addItemsFormArray();
            this.loadPriceOfferList.push({
              key: key,
              defaultDesc: res.data[key]?.defaultDesc,
            })
            this.itemsFormArray.controls[index]?.patchValue({
              itemTypeId: 4,
              categoryId: res.data[key]?.statusCategoryId,
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
    console.log(this.AddProductionRequestsForm.value);
    this._productionRequestsService.AddProductionRequests(this.AddProductionRequestsForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(`${res.message}`);
        this._Router.navigateByUrl('/productionRequests')
      }, error: (err: any) => {
        this.toastr.error(`${err.message}`);
      }
    })
  }
}
