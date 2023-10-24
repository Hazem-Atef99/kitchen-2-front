import {Component, OnInit, HostListener} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContractService} from '../contract.service';
import {ClientsService} from '../../clients/clients.service';
import {Clients, DataClients} from '../../clients/modal/clients';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {
  AddClientFileForm!: FormGroup;
  allClients: DataClients[] = [];
  weeks: any = [];
  months: any = [];
  myArray2: any = [];
  fileTypeId: any;
  clientFileId: any;
  checkValue: boolean = false;
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
  loadPriceOffer: any;
  loadPriceOfferList: any[] = [];


  constructor(
    private _FormBuilder: FormBuilder,
    private _contractService: ContractService,
    private _ClientsService: ClientsService,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _Router: Router
  ) {
    this.AddClientFileForm = this.initClientFileForm();
    for (let i= 1; 5>i; i++){
      this.weeks.push({id: i})
    }
    for (let i= 1; 13>i; i++){
      this.months.push({id: i})
    }
    this.LoadPriceOffer();
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


  initClientFileForm(): FormGroup {
    return this._FormBuilder.group({
      clientId: [null, [Validators.required]],
      contractDate: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      allPrice: [null, [Validators.required]],
      contractStatusId: [null, [Validators.required]],
      startWeek: [null, [Validators.required]],
      startMonth: [null, [Validators.required]],
      invoiceDate: [null, [Validators.required]],
      withTax: [0, [Validators.required]],
      fileTypeId: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      items: this._FormBuilder.array([]),
    })
  }

  get itemsFormArray() {
    return this.AddClientFileForm.controls["items"] as FormArray;
  }
  addItemsFormArray() {
    this.itemsFormArray.push(this.ClientFileFormGroup());
  }
  logChange() {
    if (!this.checkValue){
      this.AddClientFileForm.get('withTax')?.patchValue(0)
    } else {
      this.AddClientFileForm.get('withTax')?.patchValue(1)
    }
  }
  ClientFileFormGroup(): FormGroup {
    return this._FormBuilder.group({
      itemId: [null, [Validators.required]],
      itemTypeId: [4, [Validators.required]],
      categoryId: null,
    })
  }
  LoadPriceOffer() {
    this._contractService.LoadPriceOffer().subscribe({
      next: (res: any) => {
        this.loadPriceOfferList = []
        this.loadPriceOffer = res.data
        Object.entries(res.data).forEach(([key, value], index) => {
          this.addItemsFormArray();
          this.loadPriceOfferList.push({
            key: key,
            defaultDesc: res.data[key]?.defaultDesc,
          })
          this.itemsFormArray.controls[index]?.patchValue({
            itemTypeId: 4,
            categoryId: res.data[key].statusCategoryId,
          })
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
    if(this.clientFileId) this.GetClientFileById(this.clientFileId);
  }
  GetClientFileById(id: number) {
    this._contractService.GetClientFileByIdApi(id).subscribe({
      next: (res: any) => {
        this.AddClientFileForm.patchValue({
          clientId: res.data.client.clientId,
        });
        res.data.items.forEach((ele: any) => {
          // let index = this.itemsFormArray.controls.findIndex((secEle: any) => secEle.categoryId == ele.categoryId)

        })
        console.log(res)
      }
    })
  }
  addContract() {
    if (!this.clientFileId) {
      this._contractService.AddContract(this.AddClientFileForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(`${res.message}`);
          this._Router.navigateByUrl('/quotations')
        }, error: (err: any) => {
          this.toastr.error(`${err.message}`);
        }
      })
    } else {
      this._contractService.EditClientFile(this.AddClientFileForm.value, this.clientFileId).subscribe({
        next: (res: any) => {
          this.toastr.success(`${res.message}`);
          this._Router.navigateByUrl('/quotations')
        }, error: (err: any) => {
          this.toastr.error(`${err.message}`);
        }
      })
    }
  }
}
