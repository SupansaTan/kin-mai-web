import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { ResponseModel } from './../../../models/response.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AuthenticationService } from '../authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('successModal') successModal: ModalSuccessComponent;

  forgotPasswordForm: FormGroup;
  isSentEmail: boolean = false;

  constructor(
      private fb: FormBuilder
    , private authenticationService: AuthenticationService
    , private spinner: NgxSpinnerService
    , private localStorageService: LocalStorageService
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
      this.spinner.show();
      const email = this.forgotPasswordForm.get('email')?.value;

      this.authenticationService.sendEmailForgotPassword(email).subscribe(
        (response: ResponseModel<boolean>) => {
          this.spinner.hide();

          if (response && response?.status === 200) {
            this.isSentEmail = true;
            this.forgotPasswordForm.reset();
          } else {
            this.isSentEmail = false;
            this.successModal.openSuccessModal(false, response.message);
          }
      })
    }
  }
}
