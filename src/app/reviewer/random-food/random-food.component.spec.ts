import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomFoodComponent } from './random-food.component';

describe('RandomFoodComponent', () => {
  let component: RandomFoodComponent;
  let fixture: ComponentFixture<RandomFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
