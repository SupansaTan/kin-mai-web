import { environment } from 'src/environments/environment';
import { BusinessHourModel, RestaurantAddressModel, RestaurantInfoModel, RestaurantContactModel } from './../../../../../models/register.model';
import { SocialContactType } from './../../../../../constant/social-contact-type.constant';
import { DeliveryType } from './../../../../../constant/delivery-type.constant';
import { PaymentMethod } from './../../../../../constant/payment-method.constant';
import { DrinkAndDessertCategory, FoodCategory } from './../../../../../constant/food-category.constant';
import { RestaurantType } from './../../../../../constant/restaurant-type.constant';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { DayList } from 'src/constant/day-list.constant';
import { RestaurantTypeEnum } from 'src/enum/restaurant-type.enum';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss']
})
export class RestaurantInfoComponent implements OnInit {
  @Output() isFormValid = new EventEmitter<boolean>();
  @Output() restaurantInfoFormValue = new EventEmitter<RestaurantInfoModel>();

  registerRestaurantForm: FormGroup;
  deliveryTypeInput: FormControl = new FormControl([]);
  paymentMethodInput: FormControl = new FormControl([]);
  currentStage: number = 0;
  restaurantType = RestaurantType;
  foodCategory = [...FoodCategory, ...DrinkAndDessertCategory];
  paymentMethod = PaymentMethod;
  deliveryType = DeliveryType;
  socialContactType = SocialContactType;
  dayList = DayList;

  lat: number;
  lng: number;
  formatAddress: string = '';
  apiLoaded: Observable<boolean>;
  isNotSetMarker: boolean = false;
  options: google.maps.MapOptions;
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPositions: google.maps.LatLngLiteral;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private geocoder: MapGeocoder,
    ) {
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
          startTime: new FormControl(null, [
            Validators.required
          ]),
          endTime: new FormControl(null, [
            Validators.required
          ]),
        }, {
          validators: this.timeRageValidator
        })
      ])
    })
  }

  ngOnInit(): void {
    this.getUserCurrentLocation();
    this.apiLoaded = this.httpClient
      .jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApi}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
    // set google map options
    this.options = {
      center: {
        lat: 13.736717,
        lng: 100.523186
      },
      zoom: 15,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    };
  }

  @Input()
  set stage(value: number) {
    this.currentStage = value;

    if (value === 4) {
      this.registerRestaurantForm.disable();
    } else {
      this.registerRestaurantForm.enable();
    }
  }

  get stage() {
    return this.currentStage;
  }

  getUserCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.setMapCoordinate();
      },
      (err) => {
        // User not allowed to get current position
        // set coordinates at Bangkok, Thailand
        this.lat = 13.736717;
        this.lng = 100.523186;
        this.setMapCoordinate();
      },
      {timeout:10000}
    );
  }

  setMapCoordinate() {
    this.options = {
      center: {
        lat: this.lat,
        lng: this.lng
      },
      zoom: 15,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    };
  }

  addMarker(event: google.maps.MapMouseEvent) {
    let position = event.latLng?.toJSON();
    if (position) {
      this.markerPositions = position;
      this.isNotSetMarker = false;
      this.getAddressFromMarker();
    }
  }

  setMarkerPosition(event: google.maps.MapMouseEvent) {
    let position = event.latLng?.toJSON();
    if (position) {
      this.lat = position.lat;
      this.lng = position.lng;
      this.markerPositions = position;
      this.isNotSetMarker = false;
      this.getAddressFromMarker();
    }
  }

  getAddressFromMarker() {
    let geocodeRequest = { 'location': this.markerPositions, 'language': 'th' };
    this.geocoder
      .geocode(geocodeRequest)
      .subscribe((response: MapGeocoderResponse) => {
        if (response.status === 'OK') {
          let address = response.results[0].formatted_address;
          this.formatAddress = address;
        }
    });
  }

  setRestaurantAddress() {
    this.registerRestaurantForm.controls['address'].setValue(this.formatAddress);
  }

  addressChange(place: Address) {
    if (place) {
      this.formatAddress = place.formatted_address;
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
      this.setMapCoordinate();
      this.markerPositions = place.geometry.location.toJSON();
    }
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

  getStartTimeFormControl(index: number): AbstractControl {
    const businessHour = this.BusinessHourArray.controls[index] as FormGroup;
    return businessHour.controls['startTime'];
  }

  getEndTimeFormControl(index: number): AbstractControl {
    const businessHour = this.BusinessHourArray.controls[index] as FormGroup;
    return businessHour.controls['endTime'];
  }

  get FoodCategoryList(): Array<string> {
    let foodCategoryList = new Array<string>();
    for (let item of this.FoodCategoryFormControl.value) {
      if (item < 9) {
        foodCategoryList.push(FoodCategory[item-1].name);
      } else {
        foodCategoryList.push(DrinkAndDessertCategory[item-9].name);
      }
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

  setFoodCategorySelector() {
    const restaurantType = this.registerRestaurantForm.get('restaurantType')?.value;
    switch(restaurantType) {
      case RestaurantTypeEnum.All:
        this.foodCategory = [...FoodCategory, ...DrinkAndDessertCategory];
        break;
      case RestaurantTypeEnum.Food:
        this.foodCategory = FoodCategory;
        break;
      case RestaurantTypeEnum.DrinkAndDessert:
        this.foodCategory = DrinkAndDessertCategory;
        break;
      default:
        this.foodCategory = [...FoodCategory, ...DrinkAndDessertCategory];
    }
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
        startTime: new FormControl(null, [
          Validators.required
        ]),
        endTime: new FormControl(null, [
          Validators.required
        ]),
      }, {
        validators: this.timeRageValidator
      });
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

  timeRageValidator(control: AbstractControl) {
    const start = control.get('startTime')?.value;
    const end = control.get('endTime')?.value;

    if (start && end) {
      let stime = new Date(`01/01/2001 ${start}:00`).getTime();
      let etime = new Date(`01/01/2001 ${end}:00`).getTime();

      if (stime >= etime) {
        control.get('startTime')?.setErrors({ 'incorrect': true });
        control.get('endTime')?.setErrors({ 'incorrect': true });
      } else {
        control.get('startTime')?.setErrors(null);
        control.get('endTime')?.setErrors(null);
      }
    }
    return null;
  }

  getRestaurantInfo() {
    let restaurantInfo = new RestaurantInfoModel();
    restaurantInfo.restaurantName = this.registerRestaurantForm.controls['restaurantName'].value;
    restaurantInfo.minPriceRate = this.registerRestaurantForm.controls['minPriceRate'].value;
    restaurantInfo.maxPriceRate = this.registerRestaurantForm.controls['maxPriceRate'].value;
    restaurantInfo.restaurantType = this.registerRestaurantForm.controls['restaurantType'].value;
    restaurantInfo.category = this.registerRestaurantForm.controls['foodCategory']?.value;
    restaurantInfo.deliveryType = this.registerRestaurantForm.controls['deliveryType']?.value;
    restaurantInfo.paymentMethod = this.registerRestaurantForm.controls['paymentMethod']?.value;
    restaurantInfo.businessHour = new Array<BusinessHourModel>();
    restaurantInfo.contact = new Array<RestaurantContactModel>();

    restaurantInfo.address = new RestaurantAddressModel();
    restaurantInfo.address.address = this.registerRestaurantForm.controls['address'].value;
    restaurantInfo.address.latitude = this.lat;
    restaurantInfo.address.longitude = this.lng;

    for (let i=0; i<this.BusinessHourArray.length; i++) {
      const businessHour = this.BusinessHourArray.controls[i] as FormGroup;
      let businessHourInfo = new BusinessHourModel();
      businessHourInfo.day = businessHour.controls['day'].value;
      businessHourInfo.startTime = businessHour.controls['startTime'].value;
      businessHourInfo.endTime = businessHour.controls['endTime'].value;
      restaurantInfo.businessHour.push(businessHourInfo);
    }

    for (let j=0; j<this.SocialContactArray.length; j++) {
      const contact = this.SocialContactArray.controls[j] as FormGroup;
      let contactInfo = new RestaurantContactModel();
      contactInfo.social = contact.controls['contact'].value;
      contactInfo.contactValue = contact.controls['contactValue'].value;
      restaurantInfo.contact.push(contactInfo);
    }
    return restaurantInfo;
  }

  checkFormIsValid() {
    this.registerRestaurantForm.markAllAsTouched();
    this.registerRestaurantForm.enable();

    if (this.registerRestaurantForm.valid && this.markerPositions) {
      let restaurantInfo = this.getRestaurantInfo();
      this.registerRestaurantForm.disable();
      this.restaurantInfoFormValue.emit(restaurantInfo);
      this.isFormValid.emit(true);
    } else {
      if (!this.markerPositions) {
        // user don't set marker
        this.isNotSetMarker = true;
      }
    }
  }
}

