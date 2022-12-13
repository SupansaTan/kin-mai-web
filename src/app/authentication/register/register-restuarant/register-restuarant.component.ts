import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { ConfirmPasswordValidator } from 'src/app/shared/password-match-validator.component';
import { ReataurantStepItems, StepItem } from 'src/models/step-item.model';

@Component({
  selector: 'app-regis-restuarant',
  templateUrl: './register-restuarant.component.html',
  styleUrls: ['./register-restuarant.component.scss']
})
export class RegisterRestuarantComponent implements OnInit {
  @ViewChild('successModalComponent') successModal: ModalSuccessComponent;
  @Output() onResetUserType = new EventEmitter<boolean>();

  steps: Array<StepItem> = new Array<StepItem>();
  registerReviewerForm: FormGroup;
  registerRestaurantForm: FormGroup;
  stage: number = 1;
  isShowPassword: boolean = false;
  isShowConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    // reviewer form
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

    // restaurant form
    this.registerRestaurantForm = this.fb.group({
      restaurantName: new FormControl('', [
        Validators.minLength(3),
        Validators.required
      ]),
      minPriceRate: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      maxPriceRate: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.minLength(10),
        Validators.required
      ]),
      restaurantType: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      restaurantCategory: new FormArray([]),
      deliveryType: new FormArray([]),
      paymentMethod: new FormArray([]),
      socialContact: new FormGroup({
        contact: new FormControl(null),
        contactValue: new FormControl('')
      }),
      businessHour: this.fb.array([
        new FormGroup({
          day: new FormControl(null, [
            Validators.minLength(1),
            Validators.required
          ]),
          time: new FormControl('', [
            Validators.required
          ])
        })
      ])
    })
  }

  ngOnInit(): void {
    this.steps = ReataurantStepItems;
  }

  changeToPreviousStage() {
    this.registerReviewerForm.enable();
    this.stage = 1;
  }

  changeToNextStage() {
    this.registerReviewerForm.markAllAsTouched();

    if (this.registerReviewerForm.valid) {
      this.registerReviewerForm.disable();
      this.stage = 2;
    }
  }

  resetUserType() {
    this.onResetUserType.emit();
  }

  submit() {
    if (this.registerReviewerForm.valid) {
      this.successModal.openSuccessModal(true, 'สร้างบัญชีผู้ใช้สำเร็จ');
    }
  }
}
