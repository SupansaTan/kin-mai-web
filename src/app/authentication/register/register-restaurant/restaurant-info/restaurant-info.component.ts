import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss']
})
export class RestaurantInfoComponent implements OnInit {
  @Output() isFormValid = new EventEmitter<boolean>();

  registerRestaurantForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerRestaurantForm = this.fb.group({
      restaurantName: new FormControl('', [
        Validators.minLength(3),
        Validators.required
      ]),
      minPriceRate: new FormControl('', [
        Validators.minLength(1),
        Validators.required
      ]),
      maxPriceRate: new FormControl('', [
        Validators.minLength(1),
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.minLength(10),
        Validators.required
      ]),
      restaurantType: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      restaurantCategory: new FormArray([]),
      deliveryType: new FormArray([]),
      paymentMethod: new FormArray([]),
      socialContact: new FormGroup({
        contact: new FormControl(null),
        contactValue: new FormControl('')
      }),
      businessHour: this.fb.array([
        new FormGroup({
          day: new FormControl(null, [
            Validators.minLength(1),
            Validators.required
          ]),
          time: new FormControl('', [
            Validators.required
          ])
        })
      ])
    })
  }

  ngOnInit(): void {
  }

  checkFormIsValid() {
    this.registerRestaurantForm.markAllAsTouched();

    if (this.registerRestaurantForm.valid) {
      this.isFormValid.emit(true);
    }
  }
}

