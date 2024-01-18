import { Component, OnInit, ViewChild } from '@angular/core';
import { Task1Service } from '../task1.service';
import { NewMaster } from '../new-master';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.css']
})
export class Screen3Component implements OnInit {
  formapi: FormGroup
  obj: NewMaster
  arrayAllData: any[] = [];
  arrayAll = [];
  isCreate: boolean = true;
  showForm: boolean;
  primaryKey: number;
  isSubmit: boolean = false;
  status: number;
  strComment: string;
  selectedOption: string = ''
  isRequired: boolean = false;
  isNotRequired: boolean = false;
  isSelected: boolean = false;
  RadioValue: number;
isDtInitialized: boolean = false;
dtTrigger: Subject<any> = new Subject();
@ViewChild(DataTableDirective, { static: false })
dtElement: DataTableDirective;
dtOptions: DataTables.Settings = {
  pagingType: 'full_numbers',
  pageLength: 10,
};
constructor(private _service: Task1Service, private _formbuilder: FormBuilder) { }
ngOnInit(): void {
 debugger
 this.getAllAPIdata();
    this.getAllCurency();
    this.InitializeForm();
}
DataTableInitialization() {
 debugger
 if (this.isDtInitialized) {
   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.destroy();
     this.dtTrigger.next(null);
   });
 }
  else {  
    this.dtTrigger.next(null);
   this.isDtInitialized = true;
  }
}
ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
  InitializeForm() {
    this.formapi = this._formbuilder.group({
      country_Id: [''],
      currency: [''],
      country: [''],
      countryCode: [''],
      status: [''],
      comments: [''],
      requiredYesOrNo: ['',Validators.required],
      plantName: ['', Validators.required],
      plantAddress: [''],
    });
  }
  getAllAPIdata() {
    debugger
    this._service.getAllData().subscribe((data) => {
      try {
        this.arrayAll = data;
        this.DataTableInitialization();
      }
      catch (e) {
        console.log(e, 'error');
      }
    });
  }
  getAllCurency() {
    debugger
    this._service.getAllMasterCurrency().subscribe((data) => {
      try {
        // this.dataTableInitialization();
        this.arrayAllData = data;
      }
      catch (e) {
        console.log(e, 'error');
      }
    });
  }
  getValues() {
    debugger
    this.obj = {
      id: this.isCreate ? 0 : this.primaryKey,
      country_Id: +this.formapi.value.country_Id,
      country: this.arrayAllData.find(n => n.id == +this.formapi.value.country_Id).country,
      currency: this.formapi.value.currency,   //setting value from function
      countryCode: this.formapi.value.countryCode,
      status: +this.formapi.value.status,
      comments: this.formapi.value.comments,
      plantAddress: this.formapi.value.plantAddress,
      plantName: this.formapi.value.plantName,
      requiredYesOrNo: +this.formapi.value.requiredYesOrNo
    }
  }
  ShowRequired(val) {
    this.RadioValue = +val.value;
    if (this.RadioValue == 1) {
      this.isRequired = true;
      this.isNotRequired = false;
      this.formapi.get('plantAddress').addValidators(Validators.required);
    }
    else {
      this.isRequired = false;
      this.isNotRequired = true;
      this.formapi.get('plantAddress').clearValidators();
      this.formapi.get('plantAddress').updateValueAndValidity();
    }
  }
  Onchange() {
    debugger
    let currency = this.arrayAllData.find(n => n.id == +this.formapi.value.country_Id).currency;
    let countryCode = this.arrayAllData.find(n => n.id == +this.formapi.value.country_Id).countryCode;
    this.formapi.controls["currency"].setValue(currency)
    this.formapi.controls["countryCode"].setValue(countryCode)
  }
  PostToApi() {
    debugger
    this._service.CreateAndUpdate(this.obj).subscribe((data) => {
      try {
        this.closePopup();
        this.arrayAll = data;
        this.getAllAPIdata();
      }
      catch (error) {
        console.log(error, "Error");
      }
    });
  }
  Submit() {
    debugger;
    this.isCreate = true;
    if (this.formapi.controls['requiredYesOrNo'].value == "") {
      this.isSelected = false;
    }
    else {
      this.isSelected = true;
    }
    
    if (this.formapi.invalid) {
      this.isSubmit = true;
      return;
    }
    

    
    this.getValues();
    this.AlreadyExist();
    Swal.fire({
      icon: 'success',
      text: 'created successfully'
    });
  }
  onpopup() {
    debugger
    this.showForm = true;
    this.isSubmit = false;
    { { this.isCreate ? "Create" : "Update" } }
  }
  closePopup() {
    //this.showForm=true;
    this.formapi.reset();
    if (this.isCreate == false) {
      this.isCreate = true;
    }
    this.showForm = false;
  }
  Cancel() {
    this.showForm = false;
  }
  Update() {
    debugger
    this.isCreate = false;
    if (this.formapi.controls['comments'].value == '' || null || "") {
      this.isSubmit = true;
      return;
    }
    this.primaryKey = this.obj.id;
    this.getValues();
    this.AlreadyExist();
    //this.PostToApi();
    Swal.fire({
      icon: 'success',
      text: 'Updated successfully'
    });
    this.closePopup();
    this.formapi.reset();
  }
  OnEdit(id: any) {
    debugger
    this.isCreate = false;
    this._service.getDetails(id).subscribe((res: any) => {
      debugger
      this.obj = res;
      this.obj && this.setvalue();
      this.onpopup();
    });
  }
  setvalue() {
    debugger
    this.formapi.controls['currency'].setValue(this.obj.currency)
    this.formapi.controls['country'].setValue(this.obj.country)

    this.formapi.controls['country_Id'].setValue(this.obj.country_Id)
    this.formapi.controls['countryCode'].setValue(this.obj.countryCode)
    this.formapi.controls['status'].setValue(this.obj.status)
    this.strComment = this.obj.comments;
    this.formapi.controls['requiredYesOrNo'].setValue(this.obj.requiredYesOrNo ? "1" : "0")
    if (this.obj.requiredYesOrNo == 0) {
      this.formapi.controls['plantName'].setValue(this.obj.plantName)
      this.isNotRequired = true;
      this.isRequired = false;
    }
    else {
      this.formapi.controls['plantName'].setValue(this.obj.plantName)
      this.formapi.controls['plantAddress'].setValue(this.obj.plantAddress)
      this.isNotRequired = false;
      this.isRequired = true;
    }
  }

  AlreadyExist() {
    debugger
    this._service.AlreadyExists(this.obj).subscribe((data) => {
      try {
        debugger
        var data = data;
        if (data.data == "Details Already Existed") {
          Swal.fire({
            icon: 'warning',
            text: 'Already Existed'
          });
          this.onpopup();
          this.setvalue();
        }
        else if (data.data == "No Changes Updated") {
          Swal.fire({
            icon: "warning",
            text: 'No changes updated'
          });
          this.onpopup();
          this.setvalue();
        }
        else if (data.data == '') {
          if (this.obj.id == 0) {
            Swal.fire({
              text: 'DO YOU WANT TO CREATE?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                // User clicked "Yes," perform your backend request here
                this.PostToApi();
                Swal.fire({
                  icon: 'success',
                  text: 'created successfully'
                });
              }
              else {
                this.onpopup();
                this.setvalue();
              }
            });
          }
          else {
            Swal.fire({
              text: 'DO YOU WANT TO UPDATE?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                // User clicked "Yes," perform your backend request here
                this.PostToApi();
                Swal.fire({
                  icon: 'success',
                  text: 'updated successfully'
                });
              }
              else {
                this.onpopup();
                this.setvalue();
              }
            });
          }
        }
      }
      catch (error) {
        console.log(error, "Error");
      }
    })
  }
}

