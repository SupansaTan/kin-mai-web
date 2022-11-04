import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeeReviewComponent } from './edit-see-review.component';

describe('EditSeeReviewComponent', () => {
  let component: EditSeeReviewComponent;
  let fixture: ComponentFixture<EditSeeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSeeReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSeeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
