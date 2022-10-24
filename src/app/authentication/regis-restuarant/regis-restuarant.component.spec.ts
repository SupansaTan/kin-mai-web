import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisRestuarantComponent } from './regis-restuarant.component';

describe('RegisRestuarantComponent', () => {
  let component: RegisRestuarantComponent;
  let fixture: ComponentFixture<RegisRestuarantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisRestuarantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisRestuarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
