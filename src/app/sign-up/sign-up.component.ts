import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task1Service } from '../task1.service';
import Swal from 'sweetalert2';
import { Login } from '../login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  formapi:FormGroup;
  showForm: Boolean=false;
  obj:Login;
  isSubmit: boolean = false;

  passwordRequirements: any = {
    capital: false,
    small: false,
    number: false,
    special: false,
    length: false
  };
constructor(private _service:Task1Service,
  private router: Router){}
ngOnInit(): void {
  debugger
this.Initialization();
}
Initialization(){
  this.formapi=new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
    name:new FormControl('',Validators.required),
    mobile:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    confirmPassword:new FormControl('',Validators.required)

  });
  this.formapi.get('password').valueChanges.subscribe((value) => {
    this.updatePasswordRequirements(value);
  });
}
// validatePassword(control: FormControl) {
//   const password = control.value;

//   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   return regex.test(password) ? null : { invalidPassword: true };
// }
updatePasswordRequirements(password: string): void {
  this.passwordRequirements = {
    capital: /[A-Z]/.test(password),
    small: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
    length: password.length >= 8
  };
}
onpopup(){
  this.showForm=true;
  this.isSubmit=false;

}
getValues(){
debugger
this.obj={
  username: this.formapi.value.username,
  password:this.formapi.value.password,
  name:this.formapi.value.name,
  mobile:this.formapi.value.mobile,
  email:this.formapi.value.email,
  confirmPassword:this.formapi.value.confirmPassword
}
}


loginProcess(){
  debugger
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
if(this.obj.password==this.obj.confirmPassword){
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
else{
  Swal.fire({
    icon: 'warning',
    text: 'Mismatched passwords. Please try again!'
  });
}
 
  
}
Cancel(){
  debugger
    this.closePopup();
}
Reset(){
  this.Initialization();
}
login(){
  debugger
  this.getValues();
  this.loginProcess();
  this.onpopup();
}
login1(){
  debugger
  if (this.formapi.invalid) {
    this.isSubmit = true;
    return;
  }
  this.getValues();
  this.SignIn();
  this.onpopup();
}
closePopup(){
  this.showForm=false;
}
}
