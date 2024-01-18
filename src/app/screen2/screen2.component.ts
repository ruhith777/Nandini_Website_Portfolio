import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Task1Service } from '../task1.service';
import { Masterc } from '../masterc';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { Subject } from 'rxjs';
// import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.css']
})
export class Screen2Component implements OnInit {
  // public Editor=ClassicEditor;
  // public editorData='<p>Nandini</p>';
  formapi: FormGroup
  form:FormGroup
  obj: Masterc
  arrayAllData: any[] = [];
  arrayAll = [];
  isCreate: boolean = true;
  showForm: Boolean;
  primaryKey: number;
  isSubmit: boolean = false;
  status: number;
  strComment: string;
  isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
  };
  createddate: any;
  constructor(private _service: Task1Service, private _formbuilder: FormBuilder, private datepipe: DatePipe) { }
  // public Editor=ClassicEditor;
  // public editorData='<p>Nandini</p>';  
  ngOnInit(): void {
    debugger
    this.getAllAPIdata();
    this.getAllCurency();
    this.InitializeForm();
    this.getDate();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //}
  }
  getDate(){
    this.createddate = this.datepipe.transform(new Date(), 'yy-MM-dd hh:mm');
    // document.getElementById("getDate").innerHTML = this.createddate;
    return this.createddate;
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
  InitializeForm() {
    this.formapi = this._formbuilder.group({
      country_Id: new FormControl(),
      currency: new FormControl(),
      country: new FormControl('',Validators.required),
      countryCode: new FormControl('',Validators.required),
      status: new FormControl(),
      comments: new FormControl(),
      dateAndTime: new FormControl()
    });
    this.formapi.controls['currency'].disable();
    this.formapi.controls['dateAndTime'].disable();
  }
  getAllAPIdata() {
    this._service.getAll().subscribe((data) => {
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
    this._service.getAllCurrency().subscribe((data) => {
      try {
        // this.dataTableInitialization();
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
      country_Id: +this.formapi.value.country_Id,
      country: this.arrayAllData.find(n => n.sNo == +this.formapi.value.country_Id).country,
      currency: this.Onchange(),   //setting value from function
      countryCode: this.formapi.value.countryCode,
      status: +this.formapi.value.status,
      comments: this.formapi.value.comments,
      dateAndTime: this.getDate(),
    }
  }
  PostToApi() {
    debugger
    this._service.CreateUpdate(this.obj).subscribe((data) => {
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
    if (this.isCreate == true) {
      this.formapi.controls['dateAndTime'].setValue(this.createddate)
    }

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
  Onchange() {
    debugger
    let currency = this.arrayAllData.find(n => n.sNo == +this.formapi.value.country_Id).currency;
    this.formapi.controls["currency"].setValue(currency)
    return currency;
    
  }
  // setTodayDateTime() {
  //   let todays_date =  this.formapi.get('dateAndTime').setValue(new Date());
  //   return todays_date;
  // }
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
    this._service.getDetailsById(id).subscribe((res: any) => {
      debugger
      this.obj = res;
      this.obj && this.setvalue();
      this.onpopup();
    });
  }
  setvalue() {
    debugger

    this.formapi.controls['currency'].setValue(this.obj.currency)
    this.formapi.controls['country_Id'].setValue(this.obj.country_Id)
    this.formapi.controls['countryCode'].setValue(this.obj.countryCode)
    this.formapi.controls['status'].setValue(this.obj.status)
    //this.formapi.controls['comments'].setValue(this.obj.comments)
    this.strComment = this.obj.comments;
    this.formapi.controls['dateAndTime'].setValue(this.obj.dateAndTime)
  }
  AlreadyExist() {
    debugger
    this._service.AlreadyExisted(this.obj).subscribe((data) => {
      try {
        debugger
        var data = data;
        if (data.data == "Details Already Existed") {
          //return data;
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
