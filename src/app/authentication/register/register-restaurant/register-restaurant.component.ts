import { ResponseModel } from 'src/models/response.model';
import { ReviewerRegisterModel, RestaurantInfoModel, RestaurantPhotoModel, RestaurantRegisterModel } from './../../../../models/register.model';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { Component, EventEmitter, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { ReataurantStepItems, StepItem } from 'src/models/step-item.model';
import { AuthenticationService } from '../../authentication.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { PageLink } from 'src/constant/path-link.constant';
import { AccountType } from 'src/enum/account-type.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss']
})
export class RegisterRestaurantComponent implements OnInit, OnDestroy {
  @ViewChild('successModalComponent') successModal: ModalSuccessComponent;
  @ViewChild('personalInfo') personalInfo: PersonalInfoComponent;
  @ViewChild('restaurantInfo') restaurantInfo: RestaurantInfoComponent;
  @ViewChild('uploadPhoto') uploadPhoto: UploadPhotoComponent;
  @Output() onResetUserType = new EventEmitter<boolean>();

  private sub: any;

  steps: Array<StepItem> = new Array<StepItem>();
  firstname: string;
  lastname: string;
  email: string;
  stage: number = 1;
  isSubmit: boolean = false;
  isShowPassword: boolean = false;
  isFormValid: boolean = false;
  isLoginWithGoogle: boolean = false;
  isShowConfirmPassword: boolean = false;
  personalInfoForm: ReviewerRegisterModel;
  restaurantInfoForm: RestaurantInfoModel;
  restaurantPhotoForm: RestaurantPhotoModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.steps = ReataurantStepItems;
    this.sub = this.route.params.subscribe(params => {
      this.firstname = params['firstName'];
      this.lastname = params['lastName'];
      this.email = params['email'];

      if (this.firstname && this.email) {
        this.isLoginWithGoogle = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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

  personalInfoFormValue(personalInfo: ReviewerRegisterModel) {
    this.personalInfoForm = personalInfo;
  }

  restaurantInfoFormValue(restaurantInfo: RestaurantInfoModel) {
    this.restaurantInfoForm = restaurantInfo;
  }

  restaurantPhotoFormValue(restaurantPhoto: RestaurantPhotoModel) {
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
    this.isSubmit = true;
    this.spinner.show();
    let registerInfo = new RestaurantRegisterModel();
    registerInfo.personalInfo = this.personalInfoForm;
    registerInfo.restaurantInfo = this.restaurantInfoForm;
    registerInfo.restaurantAdditionInfo = this.restaurantPhotoForm;

    this.authenticationService.restaurantRegister(registerInfo).subscribe(
      (response: ResponseModel<boolean>) => {
        this.spinner.hide();

        if (response?.status === 200) {
          this.successModal.openSuccessModal(true, 'สร้างบัญชีผู้ใช้สำเร็จ');
          setTimeout(() => {
            this.isSubmit = false;
            this.routePage();
          }, 200);
        } else {
          this.successModal.openSuccessModal(false, 'ไม่สามารถสร้างบัญชีได้ในขณะนี้ โปรดลองอีกครั้ง');
          this.isSubmit = false;
        }
    })
  }
}
