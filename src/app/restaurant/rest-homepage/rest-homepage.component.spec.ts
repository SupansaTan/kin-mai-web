import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestHomepageComponent } from './rest-homepage.component';

describe('RestHomepageComponent', () => {
  let component: RestHomepageComponent;
  let fixture: ComponentFixture<RestHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
