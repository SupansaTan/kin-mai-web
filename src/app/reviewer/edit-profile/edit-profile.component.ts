import { ModalSuccessComponent } from './../../shared/modal-success/modal-success.component';
import { ConfirmPasswordValidator } from '../../shared/password-match-validator.component';
import { ReviewerStepItems, StepItem } from './../../../models/step-item.model';
import { ReviewerRegisterModel } from './../../../models/register.model';
import { Component, EventEmitter, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit,OnDestroy {

  @ViewChild('successModalComponent') successModal: ModalSuccessComponent;
  @Output() onResetUserType = new EventEmitter<boolean>();

  private sub: any;

  steps: Array<StepItem> = new Array<StepItem>();
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
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
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
    this.steps = ReviewerStepItems;
    this.sub = this.route.params.subscribe(params => {
      this.firstname = params['firstName'];
      this.lastname = params['lastName'];
      this.email = params['email'];

      if (this.firstname && this.email) {
        this.isLoginWithGoogle = true;
        this.setRegisterInfo();
      } else {
        this.isLoginWithGoogle = false;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

  setRegisterInfo() {
    this.initForm();
    this.registerForm.controls['firstname'].setValue(this.firstname);
    this.registerForm.controls['lastname'].setValue(this.lastname);
    this.registerForm.controls['email'].setValue(this.email);
    this.registerForm.controls['email'].disable();
    this.registerForm.controls['username'].markAsTouched();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  changeToPreviousStage() {
    this.registerForm.enable();
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

  resetUserType() {
    this.onResetUserType.emit();
    this.registerForm.reset();
    this.isLoginWithGoogle = false;
  }

  getRegisterFormValue() {
    let registerModel = new ReviewerRegisterModel();
    registerModel.firstName = this.registerForm.get('firstname')?.value;
    registerModel.lastName = this.registerForm.get('lastname')?.value;
    registerModel.username = this.registerForm.get('username')?.value;
    registerModel.email = this.registerForm.get('email')?.value;
    registerModel.password = this.registerForm.get('password')?.value;
    registerModel.confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return registerModel;
  }

  submit() {
    

  }


}
