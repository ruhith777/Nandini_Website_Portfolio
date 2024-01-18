import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task1Service } from '../task1.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Login1 } from '../login1';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formapi:FormGroup;
  showForm: Boolean;
  obj:Login1;
  isSubmit: boolean = false;
constructor(private _service:Task1Service,
  private router: Router){}
ngOnInit(): void {
  debugger
this.Initialization();
}
Initialization(){
  this.formapi=new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });
}
onpopup(){
  this.showForm=true;
  this.isSubmit=false;
}
Cancel(){
  this.closePopup();
  this.showForm=false;
}
Reset(){
  this.Initialization();
}
getValues(){
debugger
this.obj={
  username: this.formapi.value.username,
  password:this.formapi.value.password
}
}
loginProcess(){
  debugger
  if (this.formapi.invalid) {
    this.isSubmit = true;
    return;
  }
  if(this.formapi.valid){
    this._service.LoginCreate(this.obj).subscribe(result=>{
      if (result.item2 == "Credentials matched") {

        Swal.fire({
          icon: 'success',
          text: 'Login Successfull'
        });
        // this.onpopup();
        // this.setvalue();
        this.router.navigate(['/screen-route']);
      }      
      else {
        Swal.fire({
          icon: "warning",
          text: 'Logins are incorrect'
        });

      }
    });
  }
}
SignIn(){
debugger
    this._service.Signin(this.obj).subscribe((data) => {
      if (data.item1 == "Details Already Existed") {

        Swal.fire({
          icon: 'warning',
          text: 'Logins already existed'
        });
    }
    else{
      Swal.fire({
        icon: 'success',
        text: 'Added successfully'
      });
    }
  });
  
  
}
login(){
  debugger
  this.getValues();
  if (this.formapi.invalid) {
    this.isSubmit = true;
    return;
  }
  this.loginProcess();
  this.onpopup();
}
login1(){
  debugger
  this.getValues();
  this.SignIn();
  this.onpopup();
}
closePopup(){
  this.showForm=false;
}
}
