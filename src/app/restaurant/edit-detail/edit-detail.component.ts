import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { StepItem } from 'src/models/step-item.model';
import { RestaurantInfoModel } from 'src/models/register.model';
import { RestaurantPhotoModel } from 'src/models/register.model';
import { RestaurantInfoComponent } from 'src/app/authentication/register/register-restaurant/restaurant-info/restaurant-info.component';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { EditReataurantStepItems } from 'src/models/step-item.model';
import { EditUploadPhotoComponent } from './edit-upload-photo/edit-upload-photo.component';
import { Router } from '@angular/router';

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
  stage: number = 2;
  isFormValid: boolean = true;
  restaurantInfoForm: RestaurantInfoModel;
  restaurantPhotoForm: RestaurantPhotoModel;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.steps = EditReataurantStepItems;
  }


  changeStage(isValid: any) {
    // if (isValid) {
    if (true) {
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
        break;
      case 2:
        this.uploadPhoto.checkFormIsValid();
        break;
    }
  }

  navigateToDetailPage() {
    this.router.navigate(['restaurant/detail'])
  }

  set restaurantInfoFormValue(restaurantInfo: RestaurantInfoModel) {
    this.restaurantInfoForm = restaurantInfo;
  }

  set restaurantPhotoFormValue(restaurantPhoto: RestaurantPhotoModel) {
    this.restaurantPhotoForm = restaurantPhoto;
  }


  submit() {
    this.successModal.openSuccessModal(true, 'แก้ไขข้อมูลสำเร็จ');
  }

}
