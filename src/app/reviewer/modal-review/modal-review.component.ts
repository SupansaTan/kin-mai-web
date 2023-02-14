import { BadReviewLabelItem, GoodReviewLabelItem } from './../../../constant/review-label.constant';
import { Component, OnInit, EventEmitter, Input, Output, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RestaurantPhotoModel } from 'src/models/register.model';

export interface Menu {
  name: string;
}

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

  modalRef: BsModalRef;
  reviewForm: FormGroup;
  badReviewLabel: Array<{ id: number, name: string, selected: boolean }>;
  goodReviewLabel: Array<{ id: number, name: string, selected: boolean }>;

  selectedRecommendReviewLabel: Array<number> = new Array<number>();
  restaurantImageList: Array<string> = new Array<string>();
  imageFileList: Array<File> = new Array<File>();
  reviewsMenu: Array<string> = new Array<string>();

  Info: any = {
    Rating: 3.5,
    TotalReview: 51,
    Menus: ["กระเพรา", "ข้าวผัด", "ก๋วยเตี๋ยว","ราดหน้า", "คั่วกลิ้ง", "ผัดมาม่า"],
    Stars: [ "star_empty", "star_empty", "star_empty", "star_empty", "star_empty" ],
    Payments: [ "เงินสด", "รับโอน" ],
    Images: [ "../../../assets/image/food-real.jpg", "../../../assets/image/food-real.jpg"],
    Types: [ "อาหาร", "เครื่องดื่ม"],
  }

  currentRate = 0;
  ratingWord = "";

  CompleteWordForm = new FormControl('');

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private cf: ChangeDetectorRef
  )
  {
    this.reviewForm = this.fb.group({
      rating: new FormControl<number>(0, Validators.required),
      comment: new FormControl<string>(''),
      menus: this.fb.array([]),
      photo: new FormControl([]),
    })
  }

  ngOnInit(): void {
    this.badReviewLabel = BadReviewLabelItem;
    this.goodReviewLabel = GoodReviewLabelItem;
  }

  public openSuccessModal(): void {
    this.modalRef = this.modalService.show(this.modalReview, {
      class: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }

// Add Recommend Menu
  newMenu(): FormGroup {
    return this.fb.group({
      name: "",
    });
  }

  menus(): FormArray {
    return this.reviewForm.get('menus') as FormArray;
  }

  addRecommendMenu(){
    this.menus().push(this.newMenu());
  }

  delRecommendMenu(index:any) {
    this.menus().removeAt(index)
  }

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

  onSubmit() {
    let comment = this.reviewForm.value["comment"]
    if (this.CompleteWordForm.value != null) {
      for (const item of this.CompleteWordForm.value){
        let newComment = comment + " " + item.toString();
        comment = newComment;
      }
    }
    this.reviewForm.value["comment"] = comment;
    this.modalRef.hide();
    console.log(this.reviewForm.value);
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
          this.restaurantImageList.push(url);
          this.cf.detectChanges();
        };
      }
    }
  }

  removeImage(index: number) {
    if (index > -1) {
      this.restaurantImageList.splice(index, 1);
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

  getRestaurantInfoValue() {
    let restaurantInfo = new RestaurantPhotoModel();
    restaurantInfo.imageFiles = this.imageFileList;
    return restaurantInfo;
  }

  checkFormIsValid() {
    this.reviewForm.markAllAsTouched();

    if (this.reviewForm.valid) {
      this.reviewForm.disable();
    }
  }
}
