import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { StepItem } from 'src/models/step-item.model';
import { RestaurantInfoModel } from 'src/models/register.model';
import { RestaurantPhotoModel } from 'src/models/register.model';
import { RestaurantInfoComponent } from 'src/app/authentication/register/register-restaurant/restaurant-info/restaurant-info.component';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { EditReataurantStepItems } from 'src/models/step-item.model';
import { EditUploadPhotoComponent } from './edit-upload-photo/edit-upload-photo.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestaurantService } from '../restaurant.service';
import { ResponseModel } from 'src/models/response.model';
import { PageLink } from 'src/constant/path-link.constant';
import { RestaurantDetailModel, RestaurantUpdateDetail, RestaurantUpdatePhotoModel } from 'src/models/restaurant-info.model';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss']
})
export class EditRestaurantDetailComponent implements OnInit {

  @ViewChild('successModalComponent') successModal: ModalSuccessComponent;
  @ViewChild('restaurantInfo') restaurantInfo: RestaurantInfoComponent;
  @ViewChild('uploadPhoto') uploadPhoto: EditUploadPhotoComponent;
  @Output() onResetUserType = new EventEmitter<boolean>();

  steps: Array<StepItem> = new Array<StepItem>();
  stage: number = 1;
  isFormValid: boolean = false;
  isSubmit: boolean = false;
  restaurantInfoForm: RestaurantInfoModel;
  restaurantPhotoForm: RestaurantUpdatePhotoModel;

  restaurantDetailData: RestaurantDetailModel;
  restaurantPhotoData: RestaurantUpdatePhotoModel;

  restaurantId: string;
  
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private restaurantService: RestaurantService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.steps = EditReataurantStepItems;
    this.restaurantId = this.localStorageService.get<string>(LocalStorageKey.restaurantId) ?? '';
  }


  changeStage(isValid: any) {
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
        this.restaurantInfo.checkFormIsValid();
        this.stage = 2
        break;
      case 2:
        this.stage = 3
        break;
    }
  }

  navigateToDetailPage() {
    this.router.navigate(['restaurant/detail'])
  }

  restaurantInfoFormValue(restaurantInfo: RestaurantInfoModel) {
    this.restaurantInfoForm = restaurantInfo;
  }

  restaurantPhotoFormValue(restaurantPhoto: RestaurantUpdatePhotoModel) {
    this.restaurantPhotoForm = restaurantPhoto;
  }


  getRestaurantDetail() {
    this.restaurantService.getRestaurantDetail(this.restaurantId).subscribe(
      (response: ResponseModel<RestaurantDetailModel>) => {
        if (response && response?.status === 200) {
          let data = response.data
          this.restaurantDetailData.restaurantInfo.name = data.restaurantInfo.name;
          this.restaurantDetailData.restaurantInfo.minPriceRate = data.restaurantInfo.minPriceRate;
          this.restaurantDetailData.restaurantInfo.maxPriceRate = data.restaurantInfo.maxPriceRate;
          this.restaurantDetailData.restaurantInfo.address = data.restaurantInfo.address;
          this.restaurantDetailData.restaurantInfo.latitude = data.restaurantInfo.latitude;
          this.restaurantDetailData.restaurantInfo.longitude = data.restaurantInfo.longitude;
          this.restaurantDetailData.restaurantInfo.restaurantType = data.restaurantInfo.restaurantType;
          this.restaurantDetailData.restaurantInfo.deliveryType = data.restaurantInfo.deliveryType;
          this.restaurantDetailData.categories = data.categories;
          this.restaurantDetailData.restaurantInfo.paymentMethod = data.restaurantInfo.paymentMethod;
          this.restaurantDetailData.socialContact = data.socialContact;
          this.restaurantDetailData.businessHours = data.businessHours;
          this.restaurantPhotoData.restaurantStatus = data.restaurantInfo.description;
          this.restaurantPhotoData.imageLink = data.restaurantInfo.imageLink;
        }
    })
  }


  submit() {
    this.isSubmit = true;
    this.spinner.show();
    let updateInfo = new RestaurantUpdateDetail();
    updateInfo.restaurantId = this.restaurantId
    updateInfo.resUpdateInfo = this.restaurantInfoForm;
    updateInfo.RemoveImageLink = this.restaurantPhotoForm.removeImage;
    updateInfo.NewImageFile = this.restaurantPhotoForm.newImage;
    updateInfo.RestaurantStatus = this.restaurantPhotoForm.restaurantStatus;


    this.restaurantService.updateRestaurantDetail(updateInfo).subscribe(
      (response: ResponseModel<boolean>) => {
        this.spinner.hide();

        if (response?.status === 200) {
          this.successModal.openSuccessModal(true, 'แก้ไขข้อมูลสำเร็จ');
          setTimeout(() => {
            this.isSubmit = false;
            this.router.navigate([PageLink.restaurant.restaurantDetail]);
          }, 200);
        } else {
          this.successModal.openSuccessModal(false, 'ไม่สำเร็จ โปรดลองอีกครั้ง');
          this.isSubmit = false;
        }
    })
  }
}
