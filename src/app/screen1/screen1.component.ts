import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task1Service } from '../task1.service';
import Swal from 'sweetalert2';
import { Master } from '../master';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css']
})
export class Screen1Component implements OnInit {
  @ViewChild('content',{static:false}) el!:ElementRef
  formapi: FormGroup
  obj: Master
  showForm: Boolean;
  arrayAll = [];
  AllCompaniesdata:any []=[];  

  isCreate: boolean = true;
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
   createddate:any;
  constructor(private _service: Task1Service) { }
  ngOnInit(): void {
    debugger
    this.getAllAPIdata();
    this.InitializeForm() ;
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
  GetCompanyDropdown() {
    this._service.getCompanyList().subscribe(res => {
      this.AllCompaniesdata = res;
    });
  }
  getAllAPIdata() {
    this._service.onGet().subscribe((data) => {
      try {
        this.arrayAll = data;
      //  this. dtTrigger.next(data);
      }
      catch (e) {
        console.log(e, 'error');
      }
    });
  }
  InitializeForm() {
    this.formapi = new FormGroup({
      currency: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      status: new FormControl(''),
      //mobile: new FormControl('',Validators.required)
    });
  }
  getValues() {
    const currency=this.trimSpaces(this.formapi.value.currency);
    const country=this.trimSpaces(this.formapi.value.country);
            this.obj = {
      sNo: this.isCreate ? 0 : this.primaryKey,
      currency: currency,
      
      country: country,
      status: +this.formapi.value.status,
    }
  }
  trimSpaces(text:string):string{
return text.replace(/\s+/g, "");
  }
  onpopup() {
    this.showForm = true;
    this.isSubmit=false;
    // this.isCreate = true;
    { { this.isCreate ? "Create" : "Update" } }
  }
  closePopup() {
    this.showForm=true;
    this.formapi.reset();
    if(this.isCreate==false)
    {
      this.isCreate = true;
    }
          this.showForm=false;
  }
  PostToApi() {
    debugger
    this._service.CreateOrUpdate(this.obj).subscribe((data) => {
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
  AlreadyExist() {
    debugger
    this._service.AlreadyExist(this.obj).subscribe((data) => {
      try {
        debugger
        var data = data
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
        else if ( data.data == '') {
          if(this.obj.sNo==0)
          {
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
          else{
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
    this.closePopup();
    this.formapi.reset();
  }
  Update() {
    debugger
    this.isCreate = false;
    this.primaryKey = this.obj.sNo;
    this.getValues();
   
    this.AlreadyExist();
    this.closePopup();
    this.formapi.reset();
  }
  OnEdit(sNo: any) {
    debugger
    this.isCreate = false;
    this._service.getById(sNo).subscribe((res: any) => {
      debugger
      this.obj = res;
      this.obj && this.setvalue();
      this.onpopup();
    });
  }
  Cancel() {
    this.closePopup();
  }
  setvalue() {
    debugger
    this.formapi.controls['currency'].setValue(this.obj.currency)
    this.formapi.controls['country'].setValue(this.obj.country)
    this.formapi.controls['status'].setValue(this.obj.status)
  }
}

