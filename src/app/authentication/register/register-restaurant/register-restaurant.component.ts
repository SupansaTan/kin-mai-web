import { ReviewerRegisterModel, RestaurantInfoModel, RestaurantPhotoModel } from './../../../../models/register.model';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { ReataurantStepItems, StepItem } from 'src/models/step-item.model';
import { AuthenticationService } from '../../authentication.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { PageLink } from 'src/constant/path-link.constant';
import { AccountType } from 'src/enum/account-type.enum';

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
  stage: number = 2;
  isShowPassword: boolean = false;
  isFormValid: boolean = false;
  isLoginWithGoogle: boolean = false;
  isShowConfirmPassword: boolean = false;
  personalInfoForm: ReviewerRegisterModel;
  restaurantInfoForm: RestaurantInfoModel;
  restaurantPhotoForm: RestaurantPhotoModel;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) { }

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

  set personalInfoFormValue(personalInfo: ReviewerRegisterModel) {
    this.personalInfoForm = personalInfo;
  }

  set restaurantInfoFormValue(restaurantInfo: RestaurantInfoModel) {
    this.restaurantInfoForm = restaurantInfo;
  }

  set restaurantPhotoFormValue(restaurantPhoto: RestaurantPhotoModel) {
    this.restaurantPhotoForm = restaurantPhoto;
  }

  routePage() {
    if (this.isLoginWithGoogle) {
      const email = this.personalInfoForm.email;
      this.authenticationService.getUserInfo(email).subscribe((resp: any) => {
        if (resp?.status === 200) {
          this.localStorageService.set(LocalStorageKey.userId, resp.data.userId);
          this.localStorageService.set(LocalStorageKey.userName, resp.data.userName);
          this.localStorageService.set(LocalStorageKey.restaurantName, resp.data.restaurantName);
          this.localStorageService.set(LocalStorageKey.userType, resp.data.userType);
          this.localStorageService.set(LocalStorageKey.viewMode, AccountType.Reviewer);
          this.authenticationService.loginSuccessEvent(true);
          this.router.navigate([PageLink.restaurant.dashboard]);
        } else {
          this.router.navigate([PageLink.authentication.login]);
        }
      })
    } else {
      this.router.navigate([PageLink.authentication.login]);
    }
  }

  submit() {
    this.successModal.openSuccessModal(true, 'สร้างบัญชีผู้ใช้สำเร็จ');
  }
}
