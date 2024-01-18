import { Component, OnInit,ViewChild } from '@angular/core';
import { CompanyDropDown } from '../company-drop-down';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Task1Service } from '../task1.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-screen5',
  templateUrl: './screen5.component.html',
  styleUrls: ['./screen5.component.css']
})
export class Screen5Component implements OnInit{
  formapi: FormGroup
  obj: CompanyDropDown
  arrayAllData: any[] = [];
  arrayAll = [];
  isCreate: boolean = true;
  showForm: boolean;
  primaryKey: number;
  isSubmit: boolean = false;
  status: number;
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
InitializeForm() {
  this.formapi = this._formbuilder.group({
    company_Id: [''],
    companyName: [''],
    companyCode: [''],
    address: ['',Validators.required],
    status: [''],
    plantId: ['',Validators.required],
    plantName: ['',Validators.required],
  });
}
DataTableInitialization() {
  debugger
  if (this.isDtInitialized) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  } else {  this.dtTrigger.next(null);
    this.isDtInitialized = true;
   }
}ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
getAllAPIdata() {
  debugger
  this._service.getList().subscribe((data) => {
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
  this._service.getOldList().subscribe((data) => {
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
    company_Id: +this.formapi.value.company_Id,
    companyName: this.arrayAllData.find(n => n.id == +this.formapi.value.company_Id).companyName,
    companyCode: this.formapi.value.companyCode,   //setting value from function
    address: this.formapi.value.address,
    status: +this.formapi.value.status,
    plantId: this.formapi.value.plantId,
    plantName: this.formapi.value.plantName,
  }
}
Onchange() {
  debugger
  let companyCode = this.arrayAllData.find(n => n.id == +this.formapi.value.company_Id).companyCode;
  this.formapi.controls["companyCode"].setValue(companyCode)
}
PostToApi() {
  debugger
  this._service.CreateANDUpdate(this.obj).subscribe((data) => {
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
  if(this.formapi.invalid){
    this.isSubmit=true;
  }
  this.isCreate = true;
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
  this._service.GetCompanyDetails(id).subscribe((res: any) => {
    debugger
    this.obj = res;
    this.obj && this.setvalue();
    this.onpopup();
  });
}
setvalue() {
  debugger
  this.formapi.controls['company_Id'].setValue(this.obj.company_Id)
  this.formapi.controls['companyCode'].setValue(this.obj.companyCode)
  this.formapi.controls['status'].setValue(this.obj.status)
  this.formapi.controls['address'].setValue(this.obj.address)
  this.formapi.controls['plantId'].setValue(this.obj.plantId)
  this.formapi.controls['plantName'].setValue(this.obj.plantName)
}
AlreadyExist() {
  debugger
  this._service.AlreadyExistss(this.obj).subscribe((data) => {
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
