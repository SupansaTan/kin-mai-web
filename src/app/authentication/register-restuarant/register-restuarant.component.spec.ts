import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRestuarantComponent } from './register-restuarant.component';

describe('RegisterRestuarantComponent', () => {
  let component: RegisterRestuarantComponent;
  let fixture: ComponentFixture<RegisterRestuarantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRestuarantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRestuarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
