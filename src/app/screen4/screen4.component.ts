import { Component, OnInit , ViewChild} from '@angular/core';
import { Company } from '../company';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Task1Service } from '../task1.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-screen4',
  templateUrl: './screen4.component.html',
  styleUrls: ['./screen4.component.css']
})
export class Screen4Component implements OnInit{
  formapi: FormGroup
  obj: Company
  arrayAll = [];
  FlagEnable: boolean;
  FlagDisable: boolean;
  isCreate: boolean = true;
  showForm: Boolean;
  primaryKey: number;
  isSubmit: boolean = false;
  popUpTitle: string;

  status: number;
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
  comments: any;
  constructor(private _service: Task1Service, private _formbuilder: FormBuilder) { }
ngOnInit(): void {
 debugger
 this.getAllAPIdata();
    this.InitializeForm();
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
 }
 ngOnDestroy(): void {
   this.dtTrigger.unsubscribe();
 }
InitializeForm() {
  this.formapi = this._formbuilder.group({
    companyName: new FormControl('',Validators.required),
    companyCode: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    status: new FormControl(),
    comments:new FormControl()
  });
}
getAllAPIdata() {
  debugger
  this._service.getCompanyList().subscribe((data) => {
    try {
      this.arrayAll = data;
      this.dtTrigger.next(data);
    }
    catch (e) {
      console.log(e, 'error');
    }
  });
}
Reset(){
  this.InitializeForm();
}
getValues() {
  debugger
  this.obj = {
    id: this.isCreate ? 0 : this.primaryKey,
    companyName: this.formapi.value.companyName,
    companyCode: this.formapi.value.companyCode,   //setting value from function
    address: this.formapi.value.address,
    status: +this.formapi.value.status,
    comments:this.formapi.value.comments
  }
}
PostToApi() {
  debugger
  this._service.createUpdate(this.obj).subscribe((data) => {
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
  if (this.formapi.invalid) {
    this.isSubmit = true;
    return;
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
  this.showForm=true;
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
  Swal.fire({
    icon: 'success',
    text: 'Updated successfully'
  });
 
  this.formapi.reset();
  this.onpopup();
}
getById(id){
  this._service.getCompanyDetails(id).subscribe((res: any) => {
    this.obj = res;

  });
}
OnEdit(id: any) {
  debugger
  this.isCreate = false;
  this._service.getCompanyDetails(id).subscribe((res: any) => {
    debugger
    this.obj = res;
    this.obj && this.setvalue();
    this.onpopup();
  });
}
onclickToggle(value,id){
  this.getById(id);
  if(value==true){
    this.onEnable(id)
  }else{
    this.onDisable(id)
  }
}
onEnable(id){
  this.onpopup();
  this.isCreate=false;
  this.FlagEnable=false;
  this.isCreate = false;
  this.popUpTitle = "Disable Meta Fields";
  this.FlagEnable=true;
  this.FlagDisable=false;
  this.getById(id);
  this.comments.enable();
}
onDisable(id){
  this.FlagDisable=false;
  this.isCreate=false;
  this.onpopup();
  this.isCreate = false;
  this.popUpTitle = "Enable MetaFields";
  this.FlagEnable=false;
  this.FlagDisable=true;
  this.getById(id);
  this.comments.enable();
}
setvalue() {
  debugger
  this.formapi.controls['companyName'].setValue(this.obj.companyName)
  this.formapi.controls['companyCode'].setValue(this.obj.companyCode)

  this.formapi.controls['address'].setValue(this.obj.address)
  this.formapi.controls['status'].setValue(this.obj.status)
  }
  AlreadyExist() {
    debugger
    this._service.AlreadyExistedd(this.obj).subscribe((data) => {
      try {
        debugger
        var data = data;
        if (data.data == "Details Already Existed") {
          Swal.fire({
            icon: 'warning',
            text: 'Already Existed'
          });
          // this.onpopup();
          // this.setvalue();
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
              // else {
              //   this.onpopup();
              //   this.setvalue();
              // }
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
              // else {
              //   this.onpopup();
              //   this.setvalue();
              // }
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


