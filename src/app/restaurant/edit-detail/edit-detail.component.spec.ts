import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestaurantDetailComponent } from './edit-detail.component';

describe('EditRestaurantDetailComponent', () => {
  let component: EditRestaurantDetailComponent;
  let fixture: ComponentFixture<EditRestaurantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRestaurantDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestaurantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
