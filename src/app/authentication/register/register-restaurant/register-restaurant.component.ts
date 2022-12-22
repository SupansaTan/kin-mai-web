import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { ReataurantStepItems, StepItem } from 'src/models/step-item.model';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss']
})
export class RegisterRestaurantComponent implements OnInit {
  @ViewChild('successModalComponent') successModal: ModalSuccessComponent;
  @ViewChild('personalInfo') personalInfo: PersonalInfoComponent;
  @ViewChild('restaurantInfo') restaurantInfo: RestaurantInfoComponent;
  @ViewChild('uploadPhoto') uploadPhoto: UploadPhotoComponent;
  @Output() onResetUserType = new EventEmitter<boolean>();

  steps: Array<StepItem> = new Array<StepItem>();
  stage: number = 1;
  isShowPassword: boolean = false;
  isFormValid: boolean = false;
  isShowConfirmPassword: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.steps = ReataurantStepItems;
  }

  changeStage(isValid: boolean) {
    if (isValid) {
      this.stage += 1;
    }
  }

  changeToPreviousStage() {
    if (this.stage > 1) {
      this.stage -= 1;
    } else {
      this.onResetUserType.emit();
    }
  }

  changeToNextStage() {
    switch(this.stage) {
      case 1:
        this.personalInfo.checkFormIsValid();
        break;
      case 2:
        this.restaurantInfo.checkFormIsValid();
        break;
      case 3:
        this.uploadPhoto.checkFormIsValid();
        break;
    }
  }

  resetUserType() {
    this.onResetUserType.emit();
  }

  submit() {
    this.successModal.openSuccessModal(true, 'สร้างบัญชีผู้ใช้สำเร็จ');
  }
}
