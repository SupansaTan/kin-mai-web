import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearlyRestaurantComponent } from './nearly-restaurant.component';

describe('NearlyRestaurantComponent', () => {
  let component: NearlyRestaurantComponent;
  let fixture: ComponentFixture<NearlyRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearlyRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearlyRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
