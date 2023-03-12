import { PageLink } from 'src/constant/path-link.constant';
import { ResponseModel } from 'src/models/response.model';
import { ResetPasswordModel } from './../../../models/reset-password.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { ConfirmPasswordValidator } from 'src/app/shared/password-match-validator.component';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  @ViewChild('successModal') successModal: ModalSuccessComponent;
  sub: any;

  resetToken: string;
  resetPasswordForm: FormGroup;
  isShowPassword: boolean = false;
  isShowConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder
  , private route: ActivatedRoute
  , private router: Router
  , private authenticationService: AuthenticationService
  , private spinner: NgxSpinnerService
  ) {
    this.resetPasswordForm = this.fb.group({
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ])
    }, {
      validators: ConfirmPasswordValidator.MatchPassword
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.resetToken = params['resetToken'];
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  submit() {
    this.resetPasswordForm.markAllAsTouched();

    if (this.resetPasswordForm.valid) {
      let request = new ResetPasswordModel();
      request.resetToken = this.resetToken;
      request.password = this.resetPasswordForm.controls['password'].value;
      request.confirmPassword = this.resetPasswordForm.controls['confirmPassword'].value;
      this.spinner.show();

      this.authenticationService.resetPassword(request).subscribe(
        (response: ResponseModel<boolean>) => {
          this.spinner.hide();
          if (response && response.status === 200) {
            this.successModal.openSuccessModal(true, 'Reset password successful');
            this.router.navigate([PageLink.authentication.login]);
          } else {
            this.successModal.openSuccessModal(false, response?.message);
          }
      })
    }
  }
}
