import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReviewComponent } from './modal-review.component';

describe('ModalReviewComponent', () => {
  let component: ModalReviewComponent;
  let fixture: ComponentFixture<ModalReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
