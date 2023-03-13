import { RestaurantPhotoModel } from 'src/models/register.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestaurantUpdatePhotoModel } from 'src/models/restaurant-info.model';

@Component({
  selector: 'app-edit-upload-photo',
  templateUrl: './edit-upload-photo.component.html',
  styleUrls: ['./edit-upload-photo.component.scss']
})
export class EditUploadPhotoComponent implements OnInit {

  @Output() isFormValid = new EventEmitter<boolean>();
  @Output() uploadPhotoFormValue = new EventEmitter<RestaurantUpdatePhotoModel>();
  @Input() imageData = new RestaurantUpdatePhotoModel();

  uploadPhotoForm: FormGroup;
  currentStage: number = 2;
  restaurantImageList: Array<string> = new Array<string>();
  imageFileList: Array<File> = new Array<File>();
  restaurantStatus: string;
  originalImg: Array<string>;
  removeImg: Array<string>;
  newImg: Array<File>;

  constructor(private fb: FormBuilder, private cf: ChangeDetectorRef) {
    // this.uploadPhotoForm = this.fb.group({
    //   imageLink: new FormControl([], [
    //     Validators.required
    //   ]),
    //   removeImage: new FormControl([], [
    //     Validators.required
    //   ]),
    //   newImage: new FormControl([], [
    //     Validators.required
    //   ]),
    //   restaurantStatus: new FormControl('',[
    //     Validators.maxLength(320)
    //   ])
    // })
  }

  ngOnInit(): void {
  }

  @Input()
  set stage(value: number) {
    this.currentStage = value;

    if (value === 3) {
      this.uploadPhotoForm.disable();
    } else {
      this.uploadPhotoForm.enable();
    }
  }

  get stage() {
    return this.currentStage;
  }

  getRestaurantPhotoToForm() {
    this.originalImg = this.imageData.imageLink;
    this.uploadPhotoForm = this.fb.group({
      imageLink: new FormControl(this.imageData.imageLink, [
        Validators.required
      ]),
      removeImage: new FormControl([], [
        Validators.required
      ]),
      newImage: new FormControl([], [
        Validators.required
      ]),
      restaurantStatus: new FormControl('',[
        Validators.maxLength(320)
      ])
    })
  }

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

  drop(event: CdkDragDrop<any>) {
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
    let restaurantInfo = new RestaurantUpdatePhotoModel();
    restaurantInfo.imageLink = this.uploadPhotoForm.controls['imageLink']?.value;
    restaurantInfo.removeImage = this.originalImg.filter(x => !restaurantInfo.imageLink.includes(x));
    restaurantInfo.newImage = this.imageFileList;
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

}
