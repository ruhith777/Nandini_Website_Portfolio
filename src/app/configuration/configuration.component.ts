import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { Task1Service } from '../task1.service';
import { Configuration } from '../configuration';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit{
  formapi: FormGroup
  obj: Configuration
  arrayAllData: any[] = [];
  arrayAllData1: any[] = [];
  isCreate: boolean = true;
  primaryKey: number;
  isSubmit: boolean = false;
  showForm: Boolean;
  arrayAll = [];
  companyArr: any[];
constructor(private _service: Task1Service, private _formbuilder: FormBuilder){}
ngOnInit(): void {
  this.getAllAPIdata();
  this.InitializeForm();
  this.getAllNames();
}
InitializeForm() {
  this.formapi = this._formbuilder.group({
    company_Id: new FormControl(),
    name: new FormControl(),
    companyName: new FormControl(),
    dob: new FormControl(),
    college: new FormControl(),
  });
}
getAllAPIdata() {
  this._service.ConfigList().subscribe((data) => {
    try {
      this.arrayAll = data;
    }
    catch (e) {
      console.log(e, 'error');
    }
  });
}
getAllNames() {
  debugger
  this._service.MultionGet().subscribe((data) => {
    try {
      this.arrayAllData = data;
    }
    catch (e) {
      console.log(e, 'error');
    }
  });
}
Reset() {
  this.InitializeForm();
}
getValues() {
  debugger
  this.obj = {
    id: this.isCreate ? 0 : this.primaryKey,
    company_Id: +this.formapi.value.company_Id,
    name: this.arrayAllData.find(n => n.id == +this.formapi.value.company_Id).name,
    companyName: this.companyArr.find(n => n.id == +this.formapi.value.companyName).companyName,   
    dob: this.formapi.value.dob,
    college: this.formapi.value.college,
  }
}
Onchange() {
  debugger
  let companyName = this.arrayAllData.find(n => n.id == +this.formapi.value.company_Id);
this.companyArr=companyName.mselect;
  //this.formapi.controls["companyName"].setValue(companyName)
  return this.companyArr; 
}
PostToApi() {
  debugger
  this._service.ConfigCreate(this.obj).subscribe((data) => {
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
  this.PostToApi();
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
}