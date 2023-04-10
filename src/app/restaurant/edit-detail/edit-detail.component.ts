import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { StepItem } from 'src/models/step-item.model';
import { BusinessHourModel, RestaurantAddressModel, RestaurantContactModel, RestaurantInfoModel } from 'src/models/register.model';
import { RestaurantPhotoModel } from 'src/models/register.model';
import { RestaurantInfoComponent } from 'src/app/authentication/register/register-restaurant/restaurant-info/restaurant-info.component';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { EditReataurantStepItems } from 'src/models/step-item.model';
import { EditUploadPhotoComponent } from './edit-upload-photo/edit-upload-photo.component';
import { Router } from '@angular/router';
import { ResBusinessHourModel, ResUpdatePhotoModel, RestaurantDetailModel, RestaurantUpdateModel } from 'src/models/restaurant-info.model';
import { ResponseModel } from 'src/models/response.model';
import { RestaurantService } from '../restaurant.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { FoodCategories } from 'src/enum/food-category.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageLink } from 'src/constant/path-link.constant';

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
  isFormValid: boolean = true;
  isSubmit: boolean = false;

  restaurantInfoForm: RestaurantInfoModel;
  restaurantPhotoForm: ResUpdatePhotoModel;

  restaurantId: string;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private restaurantService: RestaurantService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.steps = EditReataurantStepItems;
    this.restaurantId = this.localStorageService.get<string>(LocalStorageKey.restaurantId) ?? '';
    this.getRestaurantDetail()
  }


  changeStage(isValid: any) {
    if (isValid) {
      this.stage += 1;
    }
  }

  changeToPreviousStage() {
    if (this.stage > 1) {
      this.stage -= 1;
    }
  }

  changeToNextStage() {
    switch(this.stage) {
      case 1:
        this.restaurantInfo.checkFormIsValid();
        break;
      case 2:
        this.uploadPhoto.checkFormIsValid();
        break;
    }
  }

  getRestaurantDetail() {
    this.restaurantService.getRestaurantDetail(this.restaurantId).subscribe(
      (response: ResponseModel<RestaurantDetailModel>) => {
        if (response && response?.status === 200) {
          let data = response.data
          let resInfo = new RestaurantInfoModel();
          resInfo.restaurantName = data.restaurantInfo.name
          resInfo.maxPriceRate = data.restaurantInfo.maxPriceRate
          resInfo.minPriceRate = data.restaurantInfo.minPriceRate
          resInfo.paymentMethods = data.restaurantInfo.paymentMethod
          resInfo.restaurantType = data.restaurantInfo.restaurantType
          resInfo.deliveryType = data.restaurantInfo.deliveryType

          resInfo.address = new RestaurantAddressModel()
          resInfo.address.address = data.restaurantInfo.address.slice(1,-1)
          resInfo.address.latitude = data.restaurantInfo.latitude
          resInfo.address.longitude = data.restaurantInfo.longitude
          resInfo.address.markerPosition = ({lat: data.restaurantInfo.latitude, lng: data.restaurantInfo.longitude})

          data.businessHours.forEach(x => {
            let temp = JSON.parse(x.toString());
            resInfo.businessHours = new Array<BusinessHourModel>()
            let item = new BusinessHourModel()
            item.day = Number(temp.Day)
            item.startTime = new Date(`01/01/2001 ${temp.OpenTime}:00`)
            item.endTime = new Date(`01/01/2001 ${temp.CloseTime}:00`)
            resInfo.businessHours.push(item)
          })

          data.categories.forEach(x => {
            resInfo.categories = new  Array<FoodCategories>()
            resInfo.categories.push(x.categoryType)
          })

          data.socialContact.forEach(x => {
            resInfo.contact = new  Array<RestaurantContactModel>()
            let item = new RestaurantContactModel()
            item.social = x.socialType
            item.contactValue = x.contactValue
            resInfo.contact.push(item)
          })
          this.restaurantInfoForm = resInfo;

          let resPhoto = new ResUpdatePhotoModel();
          resPhoto.imageLink = data.restaurantInfo.imageLink?? []
          resPhoto.restaurantStatus = data.restaurantInfo.description?? ''
          this.restaurantPhotoForm =  resPhoto;

          this.isLoading = false;
        }
    })
  }

  navigateToDetailPage() {
    this.router.navigate([PageLink.restaurant.detail]);
  }

  restaurantInfoFormValue(restaurantInfo: RestaurantInfoModel) {
    this.restaurantInfoForm = restaurantInfo;
  }

  restaurantPhotoFormValue(restaurantPhoto: ResUpdatePhotoModel) {
    this.restaurantPhotoForm = restaurantPhoto;
  }


  submit() {
    this.isSubmit = true;
    this.spinner.show();
    let updateInfo = new RestaurantUpdateModel();
    updateInfo.RestaurantId = this.restaurantId;
    updateInfo.ResUpdateInfo = this.restaurantInfoForm;
    updateInfo.ResUpdateInfo.businessHours.forEach(x => {
      x.startTime = new Date(`01/01/2001 ${x.startTime}:00`);
      x.endTime = new Date(`01/01/2001 ${x.endTime}:00`);
    })
    updateInfo.NewImageFile = this.restaurantPhotoForm.newImg?? [];
    updateInfo.RemoveImageLink = this.restaurantPhotoForm.removeImg?? [];
    updateInfo.RestaurantStatus = this.restaurantPhotoForm.restaurantStatus?? '';

    console.log(updateInfo);

    this.restaurantService.updateRestaurantDetail(updateInfo).subscribe(
      (response: ResponseModel<boolean>) => {
        this.spinner.hide();

        if (response && response?.status === 200) {
          this.successModal.openSuccessModal(true, 'แก้ไขข้อมูลสำเร็จ');
          setTimeout(() => {
            this.isSubmit = false;
            this.navigateToDetailPage();
          }, 200);
        } else {
          this.successModal.openSuccessModal(false, 'ไม่สามารถแก้ไขข้อมูลได้ในขณะนี้ โปรดลองอีกครั้ง');
          this.isSubmit = false;
        }
    })
  }
}
