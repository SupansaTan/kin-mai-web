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
  @Input() stage: number = 0;

  uploadPhotoForm: FormGroup;
  restaurantImageList: Array<string> = new Array<string>();

  constructor(private fb: FormBuilder, private cf: ChangeDetectorRef) {
    this.uploadPhotoForm = this.fb.group({
      photo: new FormControl([], [
        Validators.required
      ]),
      restaurantStatus: new FormControl('',[
        Validators.maxLength(320)
      ])
    })
  }

  ngOnInit(): void {
  }

  onSelectFile(event: any) {
    let file = event.target.files && event.target.files.length;
    if (file) {
      let imageUrls = new Array<string>();
      for (const singlefile of event.target.files) {
        imageUrls.push(singlefile);
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
  }

  removeImage(index: number) {
    if (index > -1) {
      this.restaurantImageList.splice(index, 1);
    }
  }

  checkFormIsValid() {
    this.uploadPhotoForm.markAllAsTouched();

    if (this.uploadPhotoForm.valid) {
      this.isFormValid.emit(true);
    }
  }
}
