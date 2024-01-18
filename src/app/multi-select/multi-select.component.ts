import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Task1Service } from '../task1.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MultiSelectChild, Multiselect } from '../multiselect';
@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  myForm: FormGroup;
  isCreate: boolean;
  showForm: boolean = false;
  data: any;
  isTempFeildsMatched: boolean = false;
  updateFlag: boolean = false;
  isFieldVisible: boolean = true;
  indexvalue: number;
  tempArr: MultiSelectChild[] = [];
  refid: number;
  editObj: any;
  List: MultiSelectChild[] = [];
  dropdownSettings: IDropdownSettings = {};
  AllCompaniesdata: any[] = [];
  isSubmit: boolean;
  org: Multiselect;
  list: any[] = [];
  constructor(private _service: Task1Service, private _formbuilder: FormBuilder) { }
  ngOnInit(): void {
    debugger
    this.GetAll();
    this.GetCompanyDropdown();
    this.InitializeForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'companyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      filterable: true,
      clearSearchFilter: true,
    };
  }
  InitializeForm() {
    this.myForm = this._formbuilder.group({
      company_Id: new FormControl(''),
      companyName: new FormControl(''),
      name: new FormControl(''),
      age: new FormControl(''),
      status: new FormControl(''),
    });
  }
  GetAll() {
    debugger
    this._service.MultionGet().subscribe(res => {
      try {
        this.data = res;
      } catch (error) {
        console.error(error);
      }
    }
    );
  }
  GetCompanyDropdown() {
    debugger
    this._service.getCompanyList().subscribe(res => {
      this.AllCompaniesdata = res;
    });
  }
  onpopup() {
    this.myForm.reset();
    this.showForm = true;
    this.isCreate = true;
    this.GetCompanyDropdown();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onSubmit() {
    debugger
    if (this.myForm.invalid) {
      this.isSubmit = true;
      return;
    }
    this.getValues();
    //this.AlreadyExist();
    this.postToApi1();
    this.showForm = false;
    this.myForm.reset;
  }
  postToApi1() {
    this._service.MultiCreateOrUpdate(this.org).subscribe((data: any) => {
      try {
        this.org = data;
        this.GetAll();
        Swal.fire({
          icon: 'success',
          text: this.isCreate ? "Well done!!Created succesfully" : "Updated Succesfully"
        })
        this.myForm.reset();
        this.closePopup();
      }
      catch (error) {
        console.log(error);
      }
    });
  }
  closePopup() {
    this.showForm = false;
    this.isSubmit = false;
    this.myForm.reset();
  }
  getValues() {
    debugger
    let listcompany = this.myForm.value.company_Id;
    this.org = {
      id: this.isCreate ? 0 : this.editObj,
      status: +this.myForm.value.status,
      name: this.myForm.value.name,
      age: +this.myForm.value.age,
      mselect: listcompany,
    }
  }
  Cancel() {
    this.closePopup();
  }
  setvalue() {
    debugger
    this.list = [];
    this.myForm.controls['name'].setValue(this.org.name)
    this.myForm.controls['age'].setValue(this.org.age)
    debugger
    this.myForm.controls['status'].setValue(this.org.status)
    for (var i = 0; i < this.org.mselect.length; i++) {
      let obj = {
        id: +this.org.mselect[i].company_Id,
        companyName: this.org.mselect[i].companyName
      }
      this.list.push(obj);
    }
    this.myForm.controls['company_Id'].setValue(this.list)
  }
  Update() {
    debugger
    this.isCreate = false;
    this.editObj = this.org.id;
    this.getValues();
    this.postToApi1();
    this.closePopup();
    this.myForm.reset();
  }
  OnEdit(id: any) {
    debugger
    this.showForm = true;
    this.onpopup();
    this.isCreate = false;
    this._service.MultigetById(id).subscribe((res: any) => {
      debugger
      this.org = res;
      this.org && this.setvalue();
    });
  }
}