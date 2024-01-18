import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Task1Service } from '../task1.service';
import { Organization, OrganizationChild } from '../organization';
import Swal from 'sweetalert2';
import { group } from '@angular/animations';
@Component({
  selector: 'app-screen6',
  templateUrl: './screen6.component.html',
  styleUrls: ['./screen6.component.css']
})
export class Screen6Component implements OnInit {
  myForm: FormGroup;
  // submitted: Boolean = false;
  showForm: boolean = false;
  editObj: any;
  isCreate: boolean = true;
  isShowTempTable: boolean = false;
  orgChild: OrganizationChild;
  refid:number;
  // objadd: OrganizationChild[];
  isExists: boolean = false;
  isTempFeildsMatched: boolean = false;
  createDialog: boolean;
  AllCompaniesdata:any []=[];  
  strComment: string;
  AllPlantsdata: any[]=[];
  // PlantOrganizationData: any;
  List: OrganizationChild[] = [];
  // updateObject: OrganizationChild;
  data: any;
  org: { id: any; companyName: any; company_Id: number; plant_Id: any; plantName: any; status: any;
     comments: any; organization: OrganizationChild[]; };
  tempArr: OrganizationChild[] = [];
  updateFlag: boolean = false;
  isSubmit: boolean;
  isFieldVisible: boolean = false;
  indexvalue: number;
  // tempArr2: OrganizationChild[] = [];
  // conId: number;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective,
    { static: false })
  dtElement: DataTableDirective;
  dtOptions = {}
  isDtInit: any;
  constructor(private _service: Task1Service, private _formbuilder: FormBuilder) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.GetAll();
    this.GetCompanyDropdown();
    this.GetPlantDropDown();
    this.InitializeForm();
    
  }
  InitializeForm() {
    this.myForm = this._formbuilder.group({
      companyName: new FormControl(''),
      company_Id: new FormControl(''),
      plant_Id: new FormControl(''),
      plantName: new FormControl(''),
      ownerName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      status: new FormControl(''),
      comments: new FormControl(''),
      pinCode: new FormControl('', Validators.required),
      organizationId: new FormControl('')
    });
    this.myForm.controls['companyName'].disable();
  }
  
  GetAll() {
    debugger
    this._service.organizationList().subscribe(res => {
      try {
        this.data = res;
        this.data.forEach(element => {
          element.organization.length == 0 ? element.ownerName = "NA" :
            element.ownerName = element.organization.map(q => q.ownerName).join(',\n')
        });
        this.data.forEach(element => {
          element.organization.length == 0 ? element.email = "NA" :

            element.email = element.organization.map(q => q.email).join(',\n')
        });
        this.data.forEach(element => {
          element.organization.length == 0 ? element.pinCode = "NA" :
            element.pinCode = element.organization.map(q => q.pinCode).join(',\n')
        });
        this.DataTableInitialization();
      } catch (error) {
        console.error(error);
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }); 
  }

  DataTableInitialization() {
    if (this.isDtInit) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    }
    else {
      this.isDtInit = true;
      this.dtTrigger.next(null);
    }
  }

  GetCompanyDropdown() {
    this._service.getCompanyList().subscribe(res => {
      this.AllCompaniesdata = res;
    });
  }

  GetPlantDropDown() {
    this._service.getList().subscribe(res => {
      this.AllPlantsdata = res;
    });
  }

  add() {
    debugger
    if (this.myForm.invalid) {
      this.isSubmit = true;
      return;
    }
    let obj = {
      id: 0,
      ownerName: this.myForm.controls['ownerName'].value,
      email: this.myForm.controls['email'].value,
      pinCode: this.myForm.controls['pinCode'].value,
      organizationId: 0,
    }
    this.List.forEach(element => {
      if (obj.ownerName == element.ownerName && obj.email == element.email) {
        this.isTempFeildsMatched = true;
        Swal.fire({
          icon: 'warning',
          text: 'Already Existed'
        })
      }
    });
    if (this.isTempFeildsMatched == false) {

      this.List.push(obj);
    }
    this.isTempFeildsMatched = false;
  }

  onpopup() {
    this.List = [];
    this.myForm.reset();
    this.showForm = true;
    this.isCreate = true;
    this.isFieldVisible = true;
    this.myForm.controls['company_Id'].enable();
    this.myForm.controls['plant_Id'].enable();
    this.GetCompanyDropdown();
    this.GetPlantDropDown();
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

  // postToApi() {
  //   debugger
  //   this.isSubmit = true;
  //   this._service.organizationCreate(this.org).subscribe((result) => {
  //     try {
  //       var result = result;
  //       this.GetAll();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //     (err: HttpErrorResponse) => {
  //       console.log(err.message);
  //     });
  // }
  postToApi1()
  {
    debugger
    this._service.AlreadyExistOrg(this.org).subscribe(data => {
      try
      {
          if(data.item1 == "Employee Created Successfully" || data.item1 == "Employee Updated  Successfully")
          {
            Swal.fire(
              {
                title: this.isCreate ?  'Do you want create?' : 'Do you want to update?',
                    showDenyButton: true,
                   //showCancelButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`
              }
            ).then(result =>{
              if(result.isConfirmed)
              {
                this._service.organizationCreate(this.org).subscribe((data):any => {
                  try
                  {
                      this.GetAll();
                      this.refid=0;
                      Swal.fire({
                        icon:'success',
                        text: this.isCreate ? "Well done!!Created succesfully" : "Updated Succesfully"
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
          else if(data.item1 == "Details Already Existed")
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
              text:"No Changes Updated"
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

  getValues() {
    debugger
    this.org = {
      id: this.isCreate ? 0 : this.editObj.id,
      company_Id: +this.myForm.controls['company_Id'].value,
      companyName: this.AllCompaniesdata.find(x => x.id == +this.myForm.controls['company_Id'].value)?.companyName, 
      plant_Id: +this.myForm.controls['plant_Id'].value,
      plantName: this.AllPlantsdata.find(x => x.id == +this.myForm.controls['plant_Id'].value)?.plantName,
      status: +this.myForm.value.status,
      comments: this.myForm.value.comments,
      organization: this.List,
    }
  }

  edit(id: any) {
    debugger
    this.isCreate = false;
    this.isFieldVisible = false;
    this.showForm = true;
    this.myForm.reset();
    this._service.organizationDetails(id).subscribe((res: any) => {
      try {
        this.editObj = res;
        // console.log(res);
        this.myForm.controls['companyName'].setValue(this.editObj.companyName);
        this.myForm.controls['company_Id'].setValue(this.editObj.company_Id);
        this.myForm.controls['plant_Id'].setValue(this.editObj.plant_Id);
        this.myForm.controls['plantName'].setValue(this.editObj.plantName);
        this.myForm.controls['status'].setValue(this.editObj.status);

        this.strComment = this.editObj.comments;
        this.List = this.editObj.organization;
        this.myForm.controls['company_Id'].disable();
        this.myForm.controls['plant_Id'].disable();
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

  updateArray(newItem) {//update child
    debugger
    let orgChild = {
      id: this.isCreate ? 0 : this.editObj,
      ownerName: this.myForm.controls['ownerName'].value,
      email: this.myForm.controls['email'].value,
      pinCode: this.myForm.controls['pinCode'].value,
      organizationId: newItem.organizationId,
    }
    this.List.forEach(element => {
      if (orgChild.ownerName == element.ownerName && orgChild.email == element.email) {
        this.isTempFeildsMatched = true;
        Swal.fire({
          icon: 'warning',
          text: 'Already Existed'
        })
      }
    });
    if (this.isTempFeildsMatched == false) {
      this.List[this.indexvalue] = orgChild;
    }
    // this.updateObject = orgChild;
    // this.tempArr2.push(orgChild);
    // this.Remove(this.conId);   //if this line is not present then it will add another record for every updation
    // this.List.push(orgChild);
  }

  closePopup() {
    this.showForm = false;
    this.isExists = false;
    this.isSubmit = false;
  }

  Remove(index: number) {
    this.List.splice(index, 1);
  }

  // spaceTest(s: any) {
  //   let pattern = /[A-Z,a-z]/
  //   if (pattern.test(s.value)) {
  //     return null;
  //   }
  //   return { 'res': true }
  // }

  EditList(i) {//set values
    debugger
    this.updateFlag = true;
    this.isFieldVisible = true;
    this.isCreate = false;
    this.showForm = true;
    this.indexvalue = i;
    this.refid=this.List[i].id;
    this.myForm.controls['ownerName'].setValue(this.editObj.organization[i].ownerName);
    this.myForm.controls['email'].setValue(this.editObj.organization[i].email);
    this.myForm.controls['pinCode'].setValue(this.editObj.organization[i].pinCode);
    this.tempArr = this.editObj.organization[i];
  }
  // AlreadyExist() {
  //   debugger
  //   this._service.AlreadyExistOrg(this.org).subscribe((data) => {
  //     try {
  //       debugger
  //       // if (res1.res1 == "Details Already Existed")
  //       if (data.item2 == "Details Already Existed") {
  //         {
  //           Swal.fire({
  //             icon: 'warning',
  //             text: 'Already Existed'
  //           });
  //         }
  //       }
  //       else if (data.item2 == '') {
  //         if (this.org.id == 0) {
  //           Swal.fire({
  //             text: 'DO YOU WANT TO CREATE?',
  //             icon: 'question',
  //             showCancelButton: true,
  //             confirmButtonText: 'Yes',
  //             cancelButtonText: 'No',
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               // User clicked "Yes," perform your backend request here
  //               this.postToApi();
  //               Swal.fire({
  //                 icon: 'success',
  //                 text: 'created successfully'
  //               });
  //             }
  //           });
  //         }
  //         else {
  //           Swal.fire({
  //             text: 'DO YOU WANT TO UPDATE?',
  //             icon: 'question',
  //             showCancelButton: true,
  //             confirmButtonText: 'Yes',
  //             cancelButtonText: 'No',
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               // User clicked "Yes," perform your backend request here
  //               this.postToApi();
  //               Swal.fire({
  //                 icon: 'success',
  //                 text: 'updated successfully'
  //               });
  //             }

  //           });
  //         }
  //       }
  //     }
  //     catch (error) {
  //       console.log(error, "Error");
  //     }
  //   })
  // }
  setArray()
  {
    debugger
    const m = this.List.find(x => x.id == this.refid)
    if( m.ownerName == this.myForm.value.ownerName && m.pinCode ==this.myForm.value.pinCode && m.email ==this.myForm.value.email  )
    {
      Swal.fire({
        icon:'warning',
        text:"No Updation"
      })
      return
    }
    if(this.List.find(x => x.ownerName == this.myForm.value.ownerName) == null || this.List.length == 1 )
    {
      this.List.find(x => x.id == this.refid).ownerName=this.myForm.get('ownerName').value;
      this.List.find(x => x.id == this.refid).email=this.myForm.get('email').value;
      this.List.find(x => x.id == this.refid).pinCode=this.myForm.get('pinCode').value;
    }
    else
    {
     
      if((this.List.find(x => x.ownerName == this.myForm.value.OwnerName) != null) && (this.List.find(x => x.id == this.refid).ownerName == this.myForm.value.OwnerName))
      {
        this.List.find(x => x.id == this.refid).ownerName=this.myForm.get('ownerName').value;
        this.List.find(x => x.id == this.refid).email=this.myForm.get('email').value;
        this.List.find(x => x.id == this.refid).pinCode=this.myForm.get('pinCode').value;
      }
      else
      {
        Swal.fire({
          icon:'warning',
          text:"Owner Name Already Exist"
        })
      }
    }
  }
}
