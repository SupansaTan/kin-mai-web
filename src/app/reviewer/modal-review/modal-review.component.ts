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
export class ModalReviewComponent {

  @Output() isFormValid = new EventEmitter<boolean>();
  @Output() uploadPhotoFormValue = new EventEmitter<RestaurantPhotoModel>();

  uploadPhotoForm: FormGroup;
  menuForm:FormGroup;
  reviewForm:FormGroup;
  currentStage: number = 0;
  restaurantImageList: Array<string> = new Array<string>();
  imageFileList: Array<File> = new Array<File>();
  reviewsMenu: Array<string> = new Array<string>();

  @ViewChild('modalReview') modalReview: TemplateRef<any>;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalRef: BsModalRef;

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
    // this.uploadPhotoForm = this.fb.group({
    //   photo: new FormControl([], [
    //     Validators.required
    //   ]),
    // })
    this.reviewForm = this.fb.group({
      rating: new FormControl<number>(0, Validators.required),
      comment: new FormControl<string>(''),
      menus: this.fb.array([]),
      photo: new FormControl([]),
    })
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

  onSubmit() {
    let comment = this.reviewForm.value["comment"]
    if (this.CompleteWordForm.value != null) {
      for (const item of this.CompleteWordForm.value){
        let newComment = comment + " " + item.toString();
        comment = newComment;
      }
    }
    this.reviewForm.value["comment"] = comment;
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

  getRestaurantInfoValue() {
    let restaurantInfo = new RestaurantPhotoModel();
    restaurantInfo.imageFiles = this.imageFileList;
    return restaurantInfo;
  }

  checkFormIsValid() {
    this.reviewForm.markAllAsTouched();
    this.reviewForm.enable();

    if (this.reviewForm.valid) {
      let restaurantInfo = this.getRestaurantInfoValue();
      this.reviewForm.disable();
      this.uploadPhotoFormValue.emit(restaurantInfo);
      this.isFormValid.emit(true);
    }
  }

}
