import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReviewerComponent } from './register-reviewer.component';

describe('RegisterReviewerComponent', () => {
  let component: RegisterReviewerComponent;
  let fixture: ComponentFixture<RegisterReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterReviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
