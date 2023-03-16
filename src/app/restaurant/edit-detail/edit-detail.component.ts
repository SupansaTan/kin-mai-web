import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { StepItem } from 'src/models/step-item.model';
import { BusinessHourModel, RestaurantAddressModel, RestaurantContactModel, RestaurantInfoModel } from 'src/models/register.model';
import { RestaurantPhotoModel } from 'src/models/register.model';
import { RestaurantInfoComponent } from 'src/app/authentication/register/register-restaurant/restaurant-info/restaurant-info.component';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { EditReataurantStepItems } from 'src/models/step-item.model';
import { EditUploadPhotoComponent } from './edit-upload-photo/edit-upload-photo.component';
import { Router } from '@angular/router';
import { ResBusinessHourModel, ResUpdatePhotoModel, RestaurantDetailModel } from 'src/models/restaurant-info.model';
import { ResponseModel } from 'src/models/response.model';
import { RestaurantService } from '../restaurant.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { FoodCategories } from 'src/enum/food-category.enum';
import { NgxSpinnerService } from 'ngx-spinner';

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
  restaurantInfoForm: RestaurantInfoModel = new RestaurantInfoModel();
  restaurantPhotoForm: ResUpdatePhotoModel = new ResUpdatePhotoModel();
  restaurantId: string;
  test : string;
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
        this.uploadPhoto.checkFormIsValid();
        break;
    }
  }

  getRestaurantDetail() {
    this.restaurantService.getRestaurantDetail(this.restaurantId).subscribe(
      (response: ResponseModel<RestaurantDetailModel>) => {
        if (response && response?.status === 200) {
          let data = response.data
          this.restaurantInfoForm.restaurantName = data.restaurantInfo.name
          this.restaurantInfoForm.maxPriceRate = data.restaurantInfo.maxPriceRate
          this.restaurantInfoForm.minPriceRate = data.restaurantInfo.minPriceRate
          this.restaurantInfoForm.paymentMethods = data.restaurantInfo.paymentMethod
          this.restaurantInfoForm.restaurantType = data.restaurantInfo.restaurantType
          this.restaurantInfoForm.deliveryType = data.restaurantInfo.deliveryType

          this.restaurantInfoForm.address = new RestaurantAddressModel()
          this.restaurantInfoForm.address.address = data.restaurantInfo.address.slice(1,-1)
          this.restaurantInfoForm.address.latitude = data.restaurantInfo.latitude
          this.restaurantInfoForm.address.longitude = data.restaurantInfo.longitude

          data.businessHours.forEach(x => {
            this.restaurantInfoForm.businessHours = new Array<BusinessHourModel>()
            let item = new BusinessHourModel()
            item.day = x.day
            item.startTime = x.openTime
            item.endTime = x.closeTime
            this.restaurantInfoForm.businessHours.push(item)
          })

          data.categories.forEach(x => {
            this.restaurantInfoForm.categories = new  Array<FoodCategories>()
            this.restaurantInfoForm.categories.push(x.categoryType)
          })

          data.socialContact.forEach(x => {
            this.restaurantInfoForm.contact = new  Array<RestaurantContactModel>()
            let item = new RestaurantContactModel()
            item.social = x.socialType
            item.contactValue = x.contactValue
            this.restaurantInfoForm.contact.push(item)
          })

          this.restaurantPhotoForm.imageLink = data.restaurantInfo.imageLink?? []
          this.restaurantPhotoForm.restaurantStatus = data.restaurantInfo.description?? ''
          
          this.isLoading = false;
        }
    })
  }

  navigateToDetailPage() {
    this.router.navigate(['restaurant/detail'])
  }

  set restaurantInfoFormValue(restaurantInfo: RestaurantInfoModel) {
    this.restaurantInfoForm = restaurantInfo;
  }

  set restaurantPhotoFormValue(restaurantPhoto: ResUpdatePhotoModel) {
    this.restaurantPhotoForm = restaurantPhoto;
  }


  submit() {
    this.successModal.openSuccessModal(true, 'แก้ไขข้อมูลสำเร็จ');
    this.navigateToDetailPage()
  }
}
