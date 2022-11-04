import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerComponent } from './reviewer.component';

describe('ReviewerComponent', () => {
  let component: ReviewerComponent;
  let fixture: ComponentFixture<ReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
