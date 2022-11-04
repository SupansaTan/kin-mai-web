import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFoodComponent } from './modal-food.component';

describe('ModalFoodComponent', () => {
  let component: ModalFoodComponent;
  let fixture: ComponentFixture<ModalFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
