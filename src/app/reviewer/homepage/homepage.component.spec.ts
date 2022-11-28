import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerHomepageComponent } from './homepage.component';

describe('ReviewerHomepageComponent', () => {
  let component: ReviewerHomepageComponent;
  let fixture: ComponentFixture<ReviewerHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
