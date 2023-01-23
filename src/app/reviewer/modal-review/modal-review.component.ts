import { Component, OnInit, EventEmitter, Input, Output, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RestaurantPhotoModel } from 'src/models/register.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  ctrl = new FormControl<number | null>(null, Validators.required);

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder, 
    private cf: ChangeDetectorRef
  ) 
  {
    this.uploadPhotoForm = this.fb.group({
      photo: new FormControl([], [
        Validators.required
      ]),
    })
    this.menuForm=this.fb.group({
      menus: this.fb.array([]) ,
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
      name: '',
    });
  }

  menus(): FormArray {
    return this.menuForm.get('menus') as FormArray;
  } 
  addRecommendMenu(event:any){
    this.menus().push(this.newMenu());
  }

  delRecommendMenu(index:any): void {
    this.menus().removeAt(index)
  }

  onSubmit() {
    console.log(this.menuForm.value);
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

}
