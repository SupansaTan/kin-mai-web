import { Component, OnInit, EventEmitter, Output, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantPhotoModel } from 'src/models/register.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-modal-review',
  templateUrl: './modal-review.component.html',
  styleUrls: ['./modal-review.component.scss']
})
export class ModalReviewComponent {

  @Output() isFormValid = new EventEmitter<boolean>();
  @Output() uploadPhotoFormValue = new EventEmitter<RestaurantPhotoModel>();

  uploadPhotoForm: FormGroup;
  currentStage: number = 0;
  restaurantImageList: Array<string> = new Array<string>();
  imageFileList: Array<File> = new Array<File>();

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

  ctrl = new FormControl<number | null>(null, Validators.required);

  constructor(private modalService: BsModalService,private fb: FormBuilder, private cf: ChangeDetectorRef) {
    this.uploadPhotoForm = this.fb.group({
      photo: new FormControl([], [
        Validators.required
      ]),
      restaurantStatus: new FormControl('',[
        Validators.maxLength(320)
      ])
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

  // drop(event: CdkDragDrop<any>) {
    drop(event: any) {
    moveItemInArray(this.restaurantImageList, event.previousContainer.data.index, event.container.data.index);
    moveItemInArray(this.imageFileList, event.previousContainer.data.index, event.container.data.index);
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
    restaurantInfo.restaurantStatus = this.uploadPhotoForm.controls['restaurantStatus']?.value;
    return restaurantInfo;
  }

  checkFormIsValid() {
    this.uploadPhotoForm.markAllAsTouched();
    this.uploadPhotoForm.enable();

    if (this.uploadPhotoForm.valid) {
      let restaurantInfo = this.getRestaurantInfoValue();
      this.uploadPhotoForm.disable();
      this.uploadPhotoFormValue.emit(restaurantInfo);
      this.isFormValid.emit(true);
    }
  }
// 

}
