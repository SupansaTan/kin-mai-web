import { RestaurantPhotoModel } from './../../../../../models/register.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {
  @Output() isFormValid = new EventEmitter<boolean>();
  @Output() uploadPhotoFormValue = new EventEmitter<RestaurantPhotoModel>();

  uploadPhotoForm: FormGroup;
  backUpRegisterInfo: RestaurantPhotoModel;
  currentStage: number = 0;
  restaurantImageList: Array<string> = new Array<string>();
  imageFileList: Array<File> = new Array<File>();

  constructor(
      private fb: FormBuilder,
      private cf: ChangeDetectorRef
    ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  @Input()
  set stage(value: number) {
    this.currentStage = value;

    if (value === 4) {
      this.uploadPhotoForm.disable();
    } else {
      this.uploadPhotoForm.enable();
    }
  }

  get stage() {
    return this.currentStage;
  }

  @Input()
  set formValue(registerInfo: RestaurantPhotoModel) {
    this.backUpRegisterInfo = registerInfo;
  }

  initForm() {
    this.restaurantImageList = this.backUpRegisterInfo?.imagePathList ?? [];
    this.uploadPhotoForm = this.fb.group({
      photo: new FormControl(this.backUpRegisterInfo?.imagePathList?? [], [
        Validators.required
      ]),
      restaurantStatus: new FormControl(this.backUpRegisterInfo?.restaurantStatus ?? '',[
        Validators.maxLength(320)
      ])
    });
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
    let restaurantInfo = new RestaurantPhotoModel();
    restaurantInfo.imageFiles = this.imageFileList;
    restaurantInfo.imagePathList = this.restaurantImageList;
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
