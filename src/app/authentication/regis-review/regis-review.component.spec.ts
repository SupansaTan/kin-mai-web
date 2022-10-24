import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisReviewComponent } from './regis-review.component';

describe('RegisReviewComponent', () => {
  let component: RegisReviewComponent;
  let fixture: ComponentFixture<RegisReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
