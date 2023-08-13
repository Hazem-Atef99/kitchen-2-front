import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-quotation',
  templateUrl: './form-quotation.component.html',
  styleUrls: ['./form-quotation.component.scss']
})
export class FormQuotationComponent implements OnInit {
  AddClientFileForm!: FormGroup;
  ListOfItems:any[] = [
    {
      name:'الجرانيت',
      id:16
    },
    {
      name:'المجلى',
      id:12
    },
    {
      name:'البانيل',
      id:15
    },
    {
      name:'حفرة المجلى',
      id:13
    },
    {
      name:'تصفيح الجدران من التوب',
      id:227
    },
    {
      name:'سترب خارجي',
      id:83
    },
    {
      name:'نوع الايادي',
      id:9
    },
    {
      name:'الشفاط',
      id:23
    },
    {
      name:'تسميك التوب',
      id:276
    },
    {
      name:'البطارية',
      id:14
    },
    {
      name:'الكورنيش',
      id:178
    },
    {
      name:'توصيلات',
      id:274
    },
    {
      name:'الانارة',
      id:275
    },
    {
      name:'xxxxxxxx',
      id:0
    },
    {
      name:'متطلبات العميل',
      id:0
    },
    {
      name:'الوحدات',
      id:2
    },
    {
      name:'الاضافات',
      id:2
    },
  ]
  constructor(
    private _FormBuilder: FormBuilder
  ) {
    this.AddClientFileForm = this.initClientFileForm();
    this.ListOfItems.forEach((ele:any , index:number) => {
      this.addItemsFormArray()
      this.itemsFormArray.controls[index].patchValue({
        itemId:ele.id
      })
    })
  }
  initClientFileForm() :FormGroup{
    return this._FormBuilder.group({
      clientId: [0 , [Validators.required]],
      deviceNotes: ['' , [Validators.required]],
      fileTypeId: [0 , [Validators.required]],
      additionaldiscount:  [0 , [Validators.required]],
      items: this._FormBuilder.array([])
    })
  }
  ClientFileFormGroup() :FormGroup{
    return this._FormBuilder.group({
      itemId: [0 , [Validators.required]],
      itemCount: [0 , [Validators.required]],
      itemTypeId: [0 , [Validators.required]],
      itemPrice: [0],
      notes: [0],
      categoryId: [0]
    })
  }
  get  itemsFormArray(){
    return this.AddClientFileForm.controls["items"] as FormArray;
  }
  addItemsFormArray() {
    this.itemsFormArray.push(this.ClientFileFormGroup());
  }
  deleteItemsFormArray(index: number) {
    this.itemsFormArray.removeAt(index);
  }
  ngOnInit(): void {
      
  }
}
