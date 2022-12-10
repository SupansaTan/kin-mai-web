import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDessertComponent } from './modal-dessert.component';

describe('ModalDessertComponent', () => {
  let component: ModalDessertComponent;
  let fixture: ComponentFixture<ModalDessertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDessertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDessertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
