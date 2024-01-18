import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ppp',
  templateUrl: './ppp.component.html',
  styleUrls: ['./ppp.component.css']
})
export class PPPComponent {
  passwordForm: FormGroup;
  passwordRequirements: any = {
    capital: false,
    small: false,
    number: false,
    special: false,
    length: false
  };

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.passwordForm.get('password').valueChanges.subscribe((value) => {
      this.updatePasswordRequirements(value);
    });
  }

  updatePasswordRequirements(password: string): void {
    this.passwordRequirements = {
      capital: /[A-Z]/.test(password),
      small: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
      length: password.length >= 8
    };
  }

  onSubmit() {
    // Handle form submission logic here
    if (this.passwordForm.valid) {
      console.log('Form submitted successfully!');
    }
  }
}
