import { SocialContactType } from './../../../../../constant/social-contact-type.constant';
import { DeliveryType } from './../../../../../constant/delivery-type.constant';
import { PaymentMethod } from './../../../../../constant/payment-method.constant';
import { FoodCategory } from './../../../../../constant/food-category.constant';
import { RestaurantType } from './../../../../../constant/restaurant-type.constant';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';

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
  socialContactType = SocialContactType;

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
      socialContact: this.fb.array([]),
      businessHour: this.fb.array([
        this.fb.group({
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

  get FoodCategoryArray(): FormArray {
    return this.registerRestaurantForm.get('foodCategory') as FormArray;
  }

  get PaymentMethodArray(): FormArray {
    return this.registerRestaurantForm.get('paymentMethod') as FormArray;
  }

  get SocialContactArray(): FormArray {
    return this.registerRestaurantForm.get('socialContact') as FormArray;
  }

  get BusinessHourArray(): FormArray {
    return this.registerRestaurantForm.get('businessHour') as FormArray;
  }

  get DeliveryTypeArray(): FormArray {
    return this.registerRestaurantForm.get('deliveryType') as FormArray;
  }

  getContactValueFormControl(index: number): AbstractControl {
    const socialContact = this.SocialContactArray.controls[index] as FormGroup;
    return socialContact.controls['contactValue'];
  }

  getDayFormControl(index: number): AbstractControl {
    const businessHour = this.BusinessHourArray.controls[index] as FormGroup;
    return businessHour.controls['day'];
  }

  getTimeFormControl(index: number): AbstractControl {
    const businessHour = this.BusinessHourArray.controls[index] as FormGroup;
    return businessHour.controls['time'];
  }

  get FoodCategoryList(): Array<string> {
    const foodCategoryForm = this.registerRestaurantForm.get('foodCategory')?.value;
    return Array.from(foodCategoryForm);
  }

  get DeliveryTypeList(): Array<string> {
    const deliveryTypeForm = this.registerRestaurantForm.get('deliveryType')?.value;
    return Array.from(deliveryTypeForm);
  }

  addSocialContact() {
    this.SocialContactArray.markAllAsTouched();

    if (this.SocialContactArray.valid) {
      const newSocialContactForm = this.fb.group({
        contact: new FormControl(null, [
          Validators.required,
        ]),
        contactValue: new FormControl('', [
          Validators.required,
        ])
      })
      this.SocialContactArray.push(newSocialContactForm);
    }
  }

  addBusinessHour() {
    this.BusinessHourArray.markAllAsTouched();

    if (this.BusinessHourArray.valid) {
      const newBusinessHourForm = this.fb.group({
        day: new FormControl(null, [
          Validators.required
        ]),
        time: new FormControl('', [
          Validators.required
        ])
      })
      this.BusinessHourArray.push(newBusinessHourForm);
    }
  }

  removeSocialContact(index: number) {
    this.SocialContactArray.removeAt(index);
  }

  removeBusinessHour(index: number) {
    this.BusinessHourArray.removeAt(index);
  }

  checkFormIsValid() {
    this.registerRestaurantForm.markAllAsTouched();

    if (this.registerRestaurantForm.valid) {
      this.isFormValid.emit(true);
    }
  }
}

