import { DeliveryType } from './../../../../../constant/delivery-type.constant';
import { PaymentMethod } from './../../../../../constant/payment-method.constant';
import { FoodCategory } from './../../../../../constant/food-category.constant';
import { RestaurantType } from './../../../../../constant/restaurant-type.constant';
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
  restaurantType = RestaurantType;
  foodCategory = FoodCategory;
  paymentMethod = PaymentMethod;
  deliveryType = DeliveryType;

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
        Validators.required
      ]),
      restaurantType: new FormControl(null, [
        Validators.required
      ]),
      foodCategory: new FormArray([]),
      deliveryType: new FormArray([]),
      paymentMethod: new FormArray([]),
      socialContact: this.fb.array([
        new FormGroup({
          contact: new FormControl(null),
          contactValue: new FormControl('')
        })
      ]),
      businessHour: this.fb.array([
        new FormGroup({
          day: new FormControl(null, [
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

  get DeliveryTypeArray() {
    console.log(this.registerRestaurantForm.get('deliveryType') as FormArray)
    return this.registerRestaurantForm.get('deliveryType') as FormArray;
  }
}

