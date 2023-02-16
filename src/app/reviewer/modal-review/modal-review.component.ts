import { UpdateReviewInfoRequest } from 'src/models/review-info.model';
import { GetReviewInfoRequest, ReviewInfoModel } from './../../../models/review-info.model';
import { ResponseModel } from './../../../models/response.model';
import { AddReviewRequestModel } from './../../../models/add-review.model';
import { BadReviewLabelItem, GoodReviewLabelItem } from './../../../constant/review-label.constant';
import { Component, OnInit, EventEmitter, Input, Output, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RestaurantPhotoModel } from 'src/models/register.model';
import { ReviewerService } from '../reviewer.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-review',
  templateUrl: './modal-review.component.html',
  styleUrls: ['./modal-review.component.scss']
})
export class ModalReviewComponent implements OnInit {
  @Output() isFormValid = new EventEmitter<boolean>();
  @ViewChild('modalReview') modalReview: TemplateRef<any>;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() uploadPhotoFormValue = new EventEmitter<RestaurantPhotoModel>();
  @ViewChild('successModalComponent') successModal: ModalSuccessComponent;

  modalRef: BsModalRef;
  reviewForm: FormGroup;
  awsS3Url = environment.awsS3Url;
  currentRate = 0;
  isLoading: boolean = false;
  isReview: boolean;
  isEditReview: boolean;
  restaurantId: string;
  restaurantName: string;
  reviewInfo: ReviewInfoModel;
  badReviewLabel: Array<{ id: number, name: string, selected: boolean }>;
  goodReviewLabel: Array<{ id: number, name: string, selected: boolean }>;
  selectedRecommendReviewLabel: Array<number> = new Array<number>();
  reviewImageList: Array<string> = new Array<string>();
  removeImageList: Array<string> = new Array<string>();
  imageFileList: Array<File> = new Array<File>();

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private cf: ChangeDetectorRef,
    private reviewerService: ReviewerService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
  )
  { }

  ngOnInit(): void {
    this.initForm();
    this.badReviewLabel = BadReviewLabelItem;
    this.goodReviewLabel = GoodReviewLabelItem;
  }

  initForm() {
    this.reviewForm = this.fb.group({
      rating: new FormControl<number>(0, Validators.required),
      comment: new FormControl<string>(''),
      menus: this.fb.array([]),
      photo: new FormControl([]),
    });
  }

  public openReviewModal(isReview: boolean, isEditReview: boolean, restaurantId: string, restaurantName: string): void {
    this.isReview = isReview;
    this.isEditReview = isEditReview;
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;

    if (!isReview || (isReview && isEditReview)) {
      this.getExistReview();
    }

    this.modalRef = this.modalService.show(this.modalReview, {
      class: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  getExistReview() {
    let request = new GetReviewInfoRequest();
    request.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    request.restaurantId = this.restaurantId;
    this.reviewerService.getReviewInfo(request).subscribe(
      (response: ResponseModel<ReviewInfoModel>) => {
        if (response && response?.status === 200) {
          this.reviewInfo = response.data;
          this.currentRate = response.data.rating;
          this.reviewImageList = response.data.imageLink ?? [];
          response.data.reviewLabelList.forEach((x) => {
            this.selectRecommendReview(x, true, (response.data.rating > 2)? (x-6):(x-1));
          })

          this.reviewForm = this.fb.group({
            rating: new FormControl<number>(response.data.rating, Validators.required),
            comment: new FormControl<string>(response.data.comment),
            menus: this.fb.array(response.data.foodRecommendList ?? []),
            photo: new FormControl([]),
          });
          this.isReview ? '': this.reviewForm.disable();
        } else {
          this.closeModal();
          this.successModal.openSuccessModal(false, response.message);
        }
    })
  }

  changeToEditMode() {
    this.isReview = true;
    this.isEditReview = true;
    this.reviewForm.enable();
  }

  // Recommend Menu
  menus(): FormArray {
    return this.reviewForm.get('menus') as FormArray;
  }

  addRecommendMenu(){
    this.reviewForm.markAllAsTouched();
    if (this.reviewForm.valid) {
      this.menus().push(this.fb.control('', Validators.required));
    }
  }

  delRecommendMenu(index: number) {
    this.menus().removeAt(index);
  }

  // recommend review label
  selectRecommendReview(id: number, isSelected: boolean, i: number) {
    if (isSelected && id < 6) {
      this.badReviewLabel[i].selected = true;
      this.selectedRecommendReviewLabel.push(id);
    } else if (!isSelected && (id < 6)) {
      let index = this.selectedRecommendReviewLabel.indexOf(id);
      this.badReviewLabel[i].selected = false;
      this.selectedRecommendReviewLabel.splice(index, 1);
    } else if (isSelected && id >= 6) {
      this.goodReviewLabel[i].selected = true;
      this.selectedRecommendReviewLabel.push(id);
    } else {
      let index = this.selectedRecommendReviewLabel.indexOf(id);
      this.goodReviewLabel[i].selected = false;
      this.selectedRecommendReviewLabel.splice(index, 1);
    }
  }

  resetRecommendReviewLabel() {
    if ((this.currentRate < 3 && this.selectedRecommendReviewLabel.some(x => x > 5))
      || (this.currentRate >= 3 && this.selectedRecommendReviewLabel.some(x => x < 6))
    ) {
      this.selectedRecommendReviewLabel = new Array<number>();
    }
  }

  // Upload Photo
  onSelectFile(event: any) {
    let file = event.target.files && event.target.files.length;
    if (file) {
      for (const singlefile of event.target.files) {
        this.imageFileList.push(singlefile);
        let reader = new FileReader();
        reader.readAsDataURL(singlefile);
        this.cf.detectChanges();

        reader.onload = (event) => {
          const url = (<FileReader>event.target).result as string;
          this.reviewImageList.push(url);
          this.cf.detectChanges();
        };
      }
    }
  }

  removeImage(index: number) {
    if (this.isEditReview) {
      this.removeImageList.push(this.reviewImageList[index]);
      this.reviewImageList.splice(index, 1);
    } else {
      this.reviewImageList.splice(index, 1);
      this.imageFileList.splice(index, 1);
    }
  }

  getRatingLabel() {
    switch (this.currentRate) {
      case 1:
        return 'ไม่ประทับใจ';
      case 2:
        return 'พอใช้';
      case 3:
        return 'ดี';
      case 4:
        return 'ดีมาก';
      case 5:
        return 'สุดยอด!';
    }
    return '';
  }

  getRatingEmoji() {
    switch (this.currentRate) {
      case 1:
        return 'bi-emoji-frown';
      case 2:
        return 'bi-emoji-expressionless';
      case 3:
        return 'bi-emoji-smile';
      case 4:
        return 'bi-emoji-laughing';
      case 5:
        return 'bi-emoji-heart-eyes';
    }
    return '';
  }

  getReviewInfo() {
    let reviewInfo = new AddReviewRequestModel();
    reviewInfo.UserId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    reviewInfo.RestaurantId = this.restaurantId;
    reviewInfo.Rating = this.currentRate;
    reviewInfo.Comment = this.reviewForm.controls['comment'].value;
    reviewInfo.ImageFiles = this.imageFileList;
    reviewInfo.ReviewLabelList = this.selectedRecommendReviewLabel;
    reviewInfo.FoodRecommendList = this.reviewForm.controls['menus'].value;
    return reviewInfo;
  }

  getEditReviewInfo() {
    let reviewInfo = new UpdateReviewInfoRequest();
    reviewInfo.ReviewId = this.reviewInfo.reviewId;
    reviewInfo.Rating = this.currentRate;
    reviewInfo.Comment = this.reviewForm.controls['comment'].value;
    reviewInfo.RemoveImageLink = this.removeImageList ?? [];
    reviewInfo.NewImageFile = this.imageFileList ?? [];
    reviewInfo.ReviewLabelList = this.selectedRecommendReviewLabel;
    reviewInfo.FoodRecommendList = this.reviewForm.controls['menus'].value;
    return reviewInfo;
  }

  submit() {
    this.reviewForm.markAllAsTouched();

    if (this.reviewForm.valid) {
      this.spinner.show();
      this.reviewForm.disable();

      if (this.isEditReview) {
        let request = this.getEditReviewInfo();
        this.reviewerService.updateReviewInfo(request).subscribe(
          (response: ResponseModel<boolean>) => {
            this.spinner.hide();
            if (response && response?.status === 200) {
              this.closeModal();
              this.successModal.openSuccessModal(true, 'Update review successful');
            } else {
              this.reviewForm.enable();
              this.successModal.openSuccessModal(false, response.message);
            }
        })
      } else {
        let request = this.getReviewInfo();
        this.reviewerService.addReviewRestaurant(request).subscribe(
          (response: ResponseModel<boolean>) => {
            this.spinner.hide();
            if (response && response?.status === 200) {
              this.closeModal();
              this.successModal.openSuccessModal(true, 'Create review successful');
            } else {
              this.reviewForm.enable();
              this.successModal.openSuccessModal(false, response.message);
            }
        })
      }
    }
  }
}
