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
  deliveryTypeInput: FormControl = new FormControl([]);
  paymentMethodInput: FormControl = new FormControl([]);
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
      foodCategory: new FormControl([]),
      deliveryType: new FormControl([]),
      paymentMethod: new FormControl([]),
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

  get FoodCategoryFormControl(): FormControl {
    return this.registerRestaurantForm.get('foodCategory') as FormControl;
  }

  get PaymentMethodFormControl(): FormControl {
    return this.registerRestaurantForm.get('paymentMethod') as FormControl;
  }

  get DeliveryTypeFormControl(): FormControl {
    return this.registerRestaurantForm.get('deliveryType') as FormControl;
  }

  get SocialContactArray(): FormArray {
    return this.registerRestaurantForm.get('socialContact') as FormArray;
  }

  get BusinessHourArray(): FormArray {
    return this.registerRestaurantForm.get('businessHour') as FormArray;
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
    let foodCategoryList = new Array<string>();
    for (let item of this.FoodCategoryFormControl.value) {
      foodCategoryList.push(FoodCategory[item-1].name);
    }
    return foodCategoryList;
  }

  get PaymentMethodList(): Array<string> {
    let paymentMethodList = new Array<string>();
    for (let item of this.PaymentMethodFormControl.value) {
      paymentMethodList.push(PaymentMethod[item-1].name);
    }
    return paymentMethodList;
  }

  get DeliveryTypeList(): Array<string> {
    let deliveryTypeList = new Array<string>();
    for (let item of this.DeliveryTypeFormControl.value) {
      deliveryTypeList.push(DeliveryType[item-1].name);
    }
    return deliveryTypeList;
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

  removeFoodCategorySelected(index: number) {
    if (index > -1) {
      let foodCategoryList = this.FoodCategoryFormControl.value;
      foodCategoryList.splice(index, 1);
      this.FoodCategoryFormControl.setValue(foodCategoryList);
    } else {
      this.FoodCategoryFormControl.reset();
    }
  }

  removePaymentMethodSelected(index: number) {
    if (index > -1) {
      let paymentMethodList = this.PaymentMethodFormControl.value;
      paymentMethodList.splice(index, 1);
      this.PaymentMethodFormControl.setValue(paymentMethodList);
    } else {
      this.PaymentMethodFormControl.reset();
    }
  }

  removeDeliveryTypeSelected(index: number) {
    if (index > -1) {
      let deliveryTypeList = this.DeliveryTypeFormControl.value;
      deliveryTypeList.splice(index, 1);
      this.DeliveryTypeFormControl.setValue(deliveryTypeList);
    } else {
      this.DeliveryTypeFormControl.reset();
    }
  }

  checkFormIsValid() {
    this.registerRestaurantForm.markAllAsTouched();

    if (this.registerRestaurantForm.valid) {
      this.isFormValid.emit(true);
    }
  }
}

