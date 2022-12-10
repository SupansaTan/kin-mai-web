import { Component, OnInit } from '@angular/core';
import { EmailValidator, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.loginForm = this.fb.group({
      username: new UntypedFormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new UntypedFormControl('', [
        Validators.min(8),
        Validators.required
      ])
    });
  }

  ngOnInit(): void {

  }

  submit() {
    this.loginForm.markAsTouched();

    if (this.loginForm.valid) {
      // form valid
    }
  }
}
