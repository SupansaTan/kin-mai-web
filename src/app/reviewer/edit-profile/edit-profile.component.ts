import { PageLink } from 'src/constant/path-link.constant';
import { UpdateUserProfile, UserProfileModel } from 'src/models/user-info.model';
import { ResponseModel } from 'src/models/response.model';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ReviewerService } from './../reviewer.service';
import { ModalSuccessComponent } from './../../shared/modal-success/modal-success.component';
import { ConfirmPasswordValidator } from '../../shared/password-match-validator.component';
import { ReviewerStepItems, StepItem } from './../../../models/step-item.model';
import { ReviewerRegisterModel } from './../../../models/register.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('successModalComponent') successModal: ModalSuccessComponent;

  steps: Array<StepItem> = new Array<StepItem>();
  userInfo: UserProfileModel;
  registerForm: FormGroup;
  stage: number = 1;
  firstname: string;
  lastname: string;
  email: string;
  isSubmit: boolean = false;
  isShowPassword: boolean = false;
  isLoginWithGoogle: boolean = false;
  isShowConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private reviewerService: ReviewerService,
    private localStorageService: LocalStorageService
  ) {
    this.registerForm = this.fb.group({
      firstname: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
    }, {
      validators: ConfirmPasswordValidator.MatchPassword
    });
  }

  ngOnInit(): void {
    this.steps = ReviewerStepItems;
    this.getUserProfile();
  }

  initForm() {
    this.registerForm = this.fb.group({
      firstname: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
    });
  }

  setUserInfo() {
    this.registerForm.controls['firstname'].setValue(this.userInfo.firstName);
    this.registerForm.controls['lastname'].setValue(this.userInfo.lastName);
    this.registerForm.controls['email'].setValue(this.userInfo.email);
    this.registerForm.controls['username'].setValue(this.userInfo.username);
    this.registerForm.controls['email'].disable();
  }

  getUserProfile() {
    this.spinner.show();
    let userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    this.reviewerService.getUserProfile(userId).subscribe(
      (response: ResponseModel<UserProfileModel>) => {
        this.spinner.hide();

        if (response?.status === 200) {
          this.userInfo = response.data;
          this.setUserInfo();
        } else {
          this.successModal.openSuccessModal(false, response.message);
        }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  changeToPreviousStage() {
    this.registerForm.enable();
    this.registerForm.controls['email'].disable();
    this.stage = 1;
  }

  changeToNextStage() {
    this.registerForm.markAllAsTouched();
    this.registerForm.enable();

    if (this.registerForm.valid) {
      this.registerForm.disable();
      this.stage = 2;
    }
  }

  routeToHomepage() {
    this.router.navigate([PageLink.reviewer.homepage]);
  }

  getFormValue() {
    let userModel = new UpdateUserProfile();
    userModel.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    userModel.firstName = this.registerForm.get('firstname')?.value;
    userModel.lastName = this.registerForm.get('lastname')?.value;
    userModel.username = this.registerForm.get('username')?.value;
    return userModel;
  }

  submit() {
    this.spinner.show();
    let request = this.getFormValue();

    this.reviewerService.updateUserProfile(request).subscribe(
      (response: ResponseModel<boolean>) => {
        this.spinner.hide();

        if (response && response.status === 200) {
          this.successModal.openSuccessModal(true, 'Update profile successful.');
          setTimeout(() => {
            this.router.navigate([PageLink.reviewer.homepage]);
          }, 200);
        } else {
          this.successModal.openSuccessModal(false, response?.message);
        }
    })
  }
}
