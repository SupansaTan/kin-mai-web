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

  private sub: any;

  registerReviewerForm: FormGroup;
  firstname: string;
  lastname: string;
  email: string;
  isShowPassword: boolean = false;
  isLoginWithGoogle: boolean = false;
  isShowConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
    this.registerReviewerForm = this.fb.group({
      firstname: new FormControl('', [
        Validators.minLength(3),
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.minLength(3),
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
      this.firstname = params['firstName'];
      this.lastname = params['lastName'];
      this.email = params['email'];

      if (this.firstname && this.email) {
        this.isLoginWithGoogle = true;
        this.setRegisterInfo();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @Input()
  set stage(value: number) {
    if (value === 4) {
      this.registerReviewerForm.disable();
    } else {
      this.registerReviewerForm.enable();
    }
  }

  initForm() {
    this.registerReviewerForm.clearValidators();
    this.registerReviewerForm = this.fb.group({
      firstname: new FormControl('', [
        Validators.minLength(3),
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.minLength(3),
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

  setRegisterInfo() {
    this.initForm();
    this.registerReviewerForm.controls['firstname'].setValue(this.firstname);
    this.registerReviewerForm.controls['lastname'].setValue(this.lastname);
    this.registerReviewerForm.controls['email'].setValue(this.email);
    this.registerReviewerForm.controls['email'].disable();
  }

  checkFormIsValid() {
    this.registerReviewerForm.markAllAsTouched();
    this.registerReviewerForm.enable();

    if (this.registerReviewerForm.valid) {
      this.registerReviewerForm.disable();
      this.isFormValid.emit(true);
    }
  }
}
