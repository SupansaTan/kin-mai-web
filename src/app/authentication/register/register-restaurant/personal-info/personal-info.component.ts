import { ReviewerRegisterModel } from './../../../../../models/register.model';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/shared/password-match-validator.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  @Output() isFormValid = new EventEmitter<boolean>();
  @Output() personalInfoFormValue = new EventEmitter<ReviewerRegisterModel>();

  private sub: any;

  currentStage: number = 0;
  registerReviewerForm: FormGroup;
  backUpRegisterInfo: ReviewerRegisterModel;
  firstname: string;
  lastname: string;
  email: string;
  isShowPassword: boolean = false;
  isLoginWithGoogle: boolean = false;
  isShowConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.firstname = params['firstName'];
      this.lastname = params['lastName'];
      this.email = params['email'];

      if (this.firstname && this.email) {
        this.isLoginWithGoogle = true;
        this.initFormWithOutPassword();
      } else {
        this.initForm();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @Input()
  set stage(value: number) {
    this.currentStage = value;
    if (value === 4) {
      this.isShowPassword = false;
      this.isShowConfirmPassword = false;
      this.registerReviewerForm.disable();
    } else {
      this.registerReviewerForm.enable();
    }
  }

  get stage() {
    return this.currentStage;
  }

  @Input()
  set formValue(registerInfo: ReviewerRegisterModel) {
    this.backUpRegisterInfo = registerInfo;
  }

  initForm() {
    this.registerReviewerForm = this.fb.group({
      firstname: new FormControl(this.backUpRegisterInfo?.firstName ?? '', [
        Validators.minLength(3),
        Validators.required
      ]),
      lastname: new FormControl(this.backUpRegisterInfo?.lastName ?? '', [
        Validators.minLength(3),
        Validators.required
      ]),
      username: new FormControl(this.backUpRegisterInfo?.username ?? '', [
        Validators.minLength(5),
        Validators.required
      ]),
      email: new FormControl(this.backUpRegisterInfo?.email ?? '', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(this.backUpRegisterInfo?.password ?? '', [
        Validators.minLength(8),
        Validators.required
      ]),
      confirmPassword: new FormControl(this.backUpRegisterInfo?.confirmPassword ?? '', [
        Validators.minLength(8),
        Validators.required
      ])
    }, {
      validators: ConfirmPasswordValidator.MatchPassword
    });
  }

  initFormWithOutPassword() {
    this.registerReviewerForm.clearValidators();
    this.registerReviewerForm = this.fb.group({
      firstname: new FormControl(this.backUpRegisterInfo?.firstName ?? this.firstname, [
        Validators.minLength(3),
        Validators.required
      ]),
      lastname: new FormControl(this.backUpRegisterInfo?.lastName ?? this.lastname, [
        Validators.minLength(3),
        Validators.required
      ]),
      username: new FormControl(this.backUpRegisterInfo?.username ?? '', [
        Validators.minLength(5),
        Validators.required
      ]),
      email: new FormControl(this.backUpRegisterInfo?.email ?? this.email, [
        Validators.email,
        Validators.required
      ]),
    });
    this.registerReviewerForm.controls['email'].disable();
    this.registerReviewerForm.controls['username'].markAsTouched();
  }

  getPersonalInfo() {
    let personalInfo = new ReviewerRegisterModel();
    personalInfo.firstName = this.registerReviewerForm.controls['firstname'].value;
    personalInfo.lastName = this.registerReviewerForm.controls['lastname'].value;
    personalInfo.email = this.registerReviewerForm.controls['email'].value;
    personalInfo.username = this.registerReviewerForm.controls['username'].value;
    personalInfo.password = this.registerReviewerForm.controls['password']?.value ?? '';
    personalInfo.confirmPassword = this.registerReviewerForm.controls['confirmPassword']?.value ?? '';
    return personalInfo;
  }

  checkFormIsValid() {
    this.registerReviewerForm.markAllAsTouched();
    this.registerReviewerForm.enable();

    if (this.registerReviewerForm.valid) {
      let personalInfo = this.getPersonalInfo();
      this.registerReviewerForm.disable();
      this.personalInfoFormValue.emit(personalInfo);
      this.isFormValid.emit(true);
    }
  }
}
