import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUploadPhotoComponent } from './edit-upload-photo.component';

describe('EditUploadPhotoComponent', () => {
  let component: EditUploadPhotoComponent;
  let fixture: ComponentFixture<EditUploadPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUploadPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUploadPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
