import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Task1Service } from '../task1.service';
import { Vendor, VendorChild } from '../vendor';
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-screen7',
  templateUrl: './screen7.component.html',
  styleUrls: ['./screen7.component.css']
})
export class Screen7Component implements OnInit {
  data=[];
  myForm: FormGroup;
  List: VendorChild[] = [];
  showForm: boolean = false;
  createddate: any;

  updateFlag: boolean = false;
  tempArr: VendorChild[] = [];
  isCreate: boolean = true;
  isExists: boolean = false;
  venChild: VendorChild;
  indexvalue: number;
  strComment: string;
  refid:number;
  editObj: any;
  isFieldVisible: boolean = false;
  org: { id: any; companyName: any; company_Id: number;vendorName:any; date:any; status: any;
    comments: any; vendorChild: VendorChild[]; };
data1=[]
AllCompaniesdata:any []=[];  
isSubmit: boolean;
obj1:Vendor
  constructor(private _service: Task1Service, private _formbuilder: FormBuilder, private datepipe: DatePipe) { }
  ngOnInit(): void {
    this.GetAll();
this.InitializeForm();
this.GetCompanyDropdown();
this.getDate();

  }
  InitializeForm() {
    this.myForm = this._formbuilder.group({
      companyName: new FormControl(''),
      company_Id: new FormControl(''),
      vendorName: new FormControl(''),
      date: new FormControl(''),
      status: new FormControl(''),
      comments: new FormControl(''),
      instrumentName: new FormControl(''),
      instrumentId: new FormControl(''),
      vendor_Id: new FormControl('')
    });
  }
  GetAll() {
    debugger
    this._service.vendorList().subscribe(res => {
      this.data = res;
    });

  }
  GetCompanyDropdown() {
    this._service.getCompanyList().subscribe(res => {
      this.AllCompaniesdata = res;
    });
  }
  onpopup() {
    this.List = [];
    //this.myForm.reset();
    this.showForm = true;
    this.isCreate = true;
    this.isFieldVisible = true;
    if (this.isCreate == true) {
      this.myForm.controls['date'].setValue(this.createddate)
    }
   // this.myForm.controls['company_Id'].enable();
    //this.GetCompanyDropdown();
  }

  add() 
  {
    debugger
    if (this.myForm.invalid) {
      this.isSubmit = true;
      return;
    }
    this.enablethis();
    let obj = {
      id: 0,
      companyName: this.myForm.controls['company_Id'].value,
      vendorName: this.myForm.controls['vendorName'].value,
      date:this.myForm.controls['date'].value,
      instrumentId: this.myForm.controls['instrumentId'].value,
      instrumentName: this.myForm.controls['instrumentName'].value,
      vendor_Id: 0,
    }
    this.List.push(obj);
  }
  getValues() {
    debugger
    this.enablethis();
    this.obj1 = {
      id: this.isCreate ? 0 : this.editObj.id,
      company_Id: +this.myForm.controls['company_Id'].value,
      companyName: this.AllCompaniesdata.find(x => x.id == +this.myForm.controls['company_Id'].value)?.companyName,
      vendorName:this.myForm.controls['vendorName'].value, 
     date: this.getDate(),

// date:this.myForm.controls['date'].value, 
status: +this.myForm.value.status,
      comments: this.myForm.value.comments,
      vendorChild: this.List,
    }
  }
  Remove(index: number) {
    this.List.splice(index, 1);
  }
  getDate(){
    this.createddate = this.datepipe.transform(new Date(), 'yyyy-MM-ddThh:mm');
    // document.getElementById("getDate").innerHTML = this.createddate;
    return this.createddate;
  }

//   /this.InstrumentList.forEach(element => {
//     element.child_Instruments.forEach(childObj => {
             
//       if(this.tempchild2.company_id == element.company_id &&
//         this.tempchild2.vendor == element.vendor &&
//         this.tempchild2.instrumentid == childObj.instrumentid &&
//         this.tempchild2.instrumentName == childObj.instrumentName){
//           Swal.fire({
//             icon:'warning',
//             text:"Instrument Already Exists",
//           });
//           this.ifTempFeildsMatched = true;
//         }
//     });
 
//     });
//     if(this.ifTempFeildsMatched == false){
//       this.MainchildList.push(this.tempchild2);
//       console.table(this.MainchildList);
     
//     }
//     this.ifTempFeildsMatched = false;
   
// }

  onSubmit() {
    debugger
    if (this.myForm.invalid) {
      this.isSubmit = true;
      return;
    }
    this.getValues();
    //this.AlreadyExist();
    this.postToApi();
    this.showForm = false;
    this.myForm.reset;
  }
  // postToApi1()
  // {
  //   debugger
  //   this._service.AlreadyExistVendor(this.org).subscribe(data => {
  //     try
  //     {
  //         if(data.item1 == "Employee Created Successfully" || data.item1 == "Employee Updated  Successfully")
  //         {
  //           Swal.fire(
  //             {
  //               title: this.isCreate ?  'Do you want create?' : 'Do you want to update?',
  //                   showDenyButton: true,
  //                  //showCancelButton: true,
  //                   confirmButtonText: 'Yes',
  //                   denyButtonText: `No`
  //             }
  //           ).then(result =>{
  //             if(result.isConfirmed)
  //             {
  //               this._service.organizationCreate(this.org).subscribe((data):any => {
  //                 try
  //                 {
  //                     this.GetAll();
  //                     this.refid=0;
  //                     Swal.fire({
  //                       icon:'success',
  //                       text: this.isCreate ? "Well done!! Created succesfully" : "Updated Succesfully"
  //                     })
  //                     this.myForm.reset();
  //                     this.closePopup();
  //                   //  this.setValidationsForm();
  //                 }
  //                 catch(error)
  //                 {
  //                   console.log(error);
  //                 }
  //               })
  //             }
  //             else if (result.isDenied)
  //             {
  //               return
  //             }
  //           })
  //         }
  //         else if(data.item1 == "Details Already Existed")
  //         {
  //           Swal.fire({
  //             icon:'warning',
  //             text:"Already exist"
  //           })
  //          // this.setValidationsForm();
           
  //         }
  //         else
  //         {
  //           Swal.fire({
  //             icon:'warning',
  //             text:"No Changes Updated"
  //           })
  //          // this.setValidationsForm();
  //         }
  //     }
  //     catch(error)
  //     {
  //         console.log(error)
  //     }
  //   })
   
  // }
  // postToApi(){
  //   this._service.vendorCreate(this.obj1).subscribe(res =>
  //     {
  //       this.obj1=res;
  //       this.GetAll();
  //    })
  // }

  postToApi() {
    debugger
    this._service.AlreadyExistVendor(this.obj1).subscribe((res:any) => {
      try
      {
        let msg = res.item1;
          if(msg =="Employee Created Successfully" || msg =="Employee Updated  Successfully")
          {
            Swal.fire(
              {
                title: this.isCreate ?  'Do you want create?' : 'Do you want to update',
                    showDenyButton: true,
                   //showCancelButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`
              }
            ).then(result =>{
              if(result.isConfirmed)
              {
                this._service.vendorCreate(this.obj1).subscribe((data):any => {
                  try
                  {
                      this.GetAll();
                     this.indexvalue=0;
                      Swal.fire({
                        icon:'success',
                        text: this.isCreate ? "Created succesfully" : "Updated Succesfully"
                      })
                      this.myForm.reset();
                      this.closePopup();
                    //  this.setValidationsForm();
                  }
                  catch(error)
                  {
                    console.log(error);
                  }
                })
              }
              else if (result.isDenied)
              {
                return
              }
            })
          }
          else if(msg == "Details Already Existed")
          {
            Swal.fire({
              icon:'warning',
              text:"Already exist"
            })
           // this.setValidationsForm();
           
          }
          else
          {
            Swal.fire({
              icon:'warning',
              text:"No Update changes"
            })
           // this.setValidationsForm();
          }
      }
      catch(error)
      {
          console.log(error)
      }
    })
  }
  closePopup() {
    this.enablethis();
    this.showForm = false;
    this.isExists = false;
    this.isSubmit = false;
  }
  edit(id: any) {
    debugger
    this.isCreate = false;
    this.isFieldVisible = false;
    this.showForm = true;
    // this.myForm.reset();
    this._service.vendorDetails(id).subscribe((res: any) => {
      try {
        debugger
        this.editObj = res;
        console.log(res);
        this.myForm.controls['company_Id'].setValue(this.editObj.company_Id);
        // this.myForm.controls['companyName'].setValue(this.editObj.companyName);
        this.myForm.controls['vendorName'].setValue(this.editObj.vendorName);
        this.myForm.controls['date'].setValue(this.editObj.date);
        this.myForm.controls['status'].setValue(this.editObj.status);

        this.strComment = this.editObj.comments;
        this.List = this.editObj.vendorChild;
        this.disablethis();
        if(this.editObj.status==0){
          this.myForm.disable();
        }
        // this.myForm.controls['company_Id'].disable();
      } catch (error) {
        console.error(error);
      }
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    });
    //this.GetAll();
    this.myForm.reset();
  }

  // updateArray(newItem) {//update child
  //   debugger
  //   let orgChild = {
  //     id: this.isCreate?0:this.editObj.id,
    
  //     instrumentId: this.myForm.controls['instrumentId'].value,
  //     instrumentName: this.myForm.controls['instrumentName'].value,
  //   }
  //     this.List[this.indexvalue] = orgChild;
  // }


  updateArray()
{
  debugger
  const m = this.List.find(x => x.id == this.indexvalue)
  if(  m.instrumentName==this.myForm.value.instrumentName && m.instrumentId==this.myForm.value.instrumentId)
  {
    Swal.fire({
      icon:'warning',
      text:"No Updation"
    })
    return
  }
  if(this.List.find(x => x.instrumentName == this.myForm.value.instrumentName ) == null || this.List.length == 1 )
  {
    // this.Listc.find(x => x.id == this.indexvalue).companyName=this.formapi.get('companyName').value;
    // this.Listc.find(x => x.id == this.indexvalue).vendorName=this.formapi.get('vendorName').value;
      this.List.find(x => x.id == this.indexvalue).instrumentName=this.myForm.get('instrumentName').value;
     this.List.find(x => x.id == this.indexvalue).instrumentId=this.myForm.get('instrumentId').value;
 
  }
  else
  {
   
    if((this.List.find(x => x.instrumentName == this.myForm.value.instrumentName) != null) && (this.List.find(x => x.id == this.indexvalue).instrumentName == this.myForm.value.instrumentName))
    {
     
      this.List.find(x => x.id == this.indexvalue).instrumentId=this.myForm.get('instrumentId').value;
       this.List.find(x => x.id == this.indexvalue).instrumentName=this.myForm.get('instrumentName').value;
 
    }
    else
    {
      Swal.fire({
        icon:'warning',
        text:" Already Exist"
      })
    }
  }
}
  EditList(i) {//set values
    debugger
    this.updateFlag = true;
    this.isFieldVisible = true;
    this.isCreate = false;
    this.showForm = true;
    this.indexvalue = this.List[i].id;
    // this.refid=this.List[i].id;
    this.myForm.controls['instrumentId'].setValue(this.editObj.vendorChild[i].instrumentId);
    // this.myForm.controls['companyName'].setValue(this.editObj.vendorChild[i].companyNames);

    // this.myForm.controls['vendorName'].setValue(this.editObj.vendorChild[i].vendorName);
    this.myForm.controls['instrumentName'].setValue(this.editObj.vendorChild[i].instrumentName);
    //this.tempArr = this.editObj.vendorChild[i];
  }
  enablethis(){
    this.myForm.controls["companyName"].enable();
    this.myForm.controls["vendorName"].enable();
    this.myForm.controls["date"].enable();
   
   
  }
  disablethis(){
    this.myForm.controls["company_Id"].disable();
    this.myForm.controls["vendorName"].disable();
    this.myForm.controls["date"].disable();
  }
}
