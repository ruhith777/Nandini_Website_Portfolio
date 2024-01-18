import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DashBoard } from '../dash-board';
import { Task1Service } from '../task1.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
     styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtOptions = {}
  dtElement: DataTableDirective;
  isDtInit: boolean=false;
  obj1: DashBoard;
  result: any;
  isflag: boolean;
  idd:any;
  tempflag: boolean = false;
  isPopup: boolean = false;
  createDialog: boolean = false;
  EditDialog: boolean = false;
  primarykey: number;
  isCreate: boolean;
  isEdit: boolean;
  editClass: DashBoard;
  strComments: string;
  arrayc = [];
  arrayp = [];
  arrayboth:any ;
  temporarydata: any[] = [];
  childarray=[];
  myflag: boolean;
  createDialogforchildedit: boolean;
  ArrayFlag: boolean=false;
  childid: number;
  arrayyy: any;
  constructor(private org: Task1Service, private _fb: FormBuilder) {}
  array = [];
  orgdetails: FormGroup;
  ngOnInit() {
    debugger
    //this.IsRouteNavigate=false
    this.initializeForm();
    this.getAll();
  }
  initializeForm() {
    this.orgdetails = this._fb.group({
      tableName: [''],
      status: [''],
    })
  }
  get id() { return this.orgdetails.get('id') };
  get tableName() { return this.orgdetails.get('tableName') };
  get status() { return this.orgdetails.get('status') };
  getAll() {
    debugger;
    this.org.DashboardList().subscribe(data => {
        this.array=data;    
        console.log(this.array, "array1") ;    
    })
  }  
  getValues() {
    this.obj1 = {
      id: this.isCreate ? 0 : +this.primarykey,
      tableName: this.orgdetails.value.tableName,    
      status: this.status.value == true ? 1 : 0,    
    }
  }
  OnCreate() {
    debugger;
    if (this.orgdetails.invalid) {
      debugger;
      this.isflag = true;
      return;
    }
    this.getValues();  
    if (this.isCreate) {
      this.myflag=false;
      debugger
      this.org.DashboardAlreadyExist(this.obj1).subscribe((data: any) => {
        debugger
        console.log('Response from server:', data);
        if (data.item2 === "Details Already Existed") {
          Swal.fire({
            icon: 'warning',
            text: 'Already Exists'
          });
        }
        else if(data.item2 === 'Employee Doesnot Exist'){
              Swal.fire({
                icon : 'warning',
                text :"Does not Exists"
              })
        } else {
          debugger;
          this.createDashboard();
        }
      });
    }  
    else {
      this.org.DashboardAlreadyExist(this.obj1).subscribe((data: any) => {
        debugger;
        console.log('Response from server:', data);
        if (data.item2 === "No Changes Updated") {
          Swal.fire({
            icon: 'warning',
            text: 'No changes Done'
          });
        }
        else if (data.item2 === "Details Already Existed") {
          Swal.fire({
            icon: 'warning',
            text: 'Already exists'
          });
        }
        else {
          this.updateDashboard();
        }
      });
    }
  }
  createDashboard() {
    Swal.fire({
      icon: 'success',
      title: 'Do You Want To Create the Dashboard?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.org.DashboardCreate(this.obj1).subscribe(createdData => {
          let data = createdData;
          this.orgdetails.reset();
          this.createDialog = false;
          Swal.fire({
            icon: 'success',
            text: 'company created successfully',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });          
          this.getAll();
        });
      }
    });
  }
  updateDashboard() {
    debugger;
    Swal.fire({
      icon: 'success',
      text: 'Do You want To Update the dashboard',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.org.DashboardCreate  (this.obj1).subscribe(createdData => {
          this.orgdetails.reset();
          this.createDialog = false;
          Swal.fire({
            icon: 'success',
            text: 'Dashboard updated successfully',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
          this.getAll();
        });
      }
    });
  }
  Edit(id: number) {
    debugger
    this.createDialog = true;
    this.isCreate = false;
    this.org.DashboardDetails(id).subscribe(data => {  
      this.editClass=data,                
       this.setFormValues();      
    })
}
  Update(){
    debugger;
    this.isCreate = false;
    this.org.DashboardCreate(this.obj1).subscribe(data => {
      this.editClass = data;  
    })
  }
  closePopup() {
    this.orgdetails.reset();
    this.createDialog = false;
    this.isflag = false;
    this.tempflag = false;    
  }
  openPopUp() {
    this.isCreate = true;
    this.createDialog = true;
    this.tempflag=false;
    this.temporarydata=[];
    this.myflag=false;
  }
  setFormValues(){
    debugger
    this.isCreate = false;
    this.primarykey = this.editClass.id;
    this.tableName.setValue(this.editClass.tableName);
    this.status.setValue(this.editClass.status);
  }
}