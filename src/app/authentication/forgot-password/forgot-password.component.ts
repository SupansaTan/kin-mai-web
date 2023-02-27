import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AuthenticationService } from '../authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isSentEmail: boolean = false;

  constructor(
      private fb: FormBuilder
    , private authenticationService: AuthenticationService
    , private spinner: NgxSpinnerService
    ) {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }

  submit() {
    this.forgotPasswordForm.markAllAsTouched();

    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('username')?.value;
      this.spinner.show();
    }
  }
}
