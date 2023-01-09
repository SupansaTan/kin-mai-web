import { FoodCategories } from './../enum/food-category.enum';
import { DeliveryType } from 'src/enum/delivery-type.enum';
import { RestaurantTypeEnum } from 'src/enum/restaurant-type.enum';
import { SocialContact } from './../enum/social-contact.enum';
import { PaymentMethod } from 'src/enum/payment-method.enum';
export class ReviewerRegisterModel {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export class RestaurantInfoModel {
  restaurantName: string;
  minPriceRate: number;
  maxPriceRate: number;
  address: RestaurantAddressModel;
  restaurantType: RestaurantTypeEnum;
  deliveryType: Array<DeliveryType>;
  categories: Array<FoodCategories>;
  paymentMethods: Array<PaymentMethod>;
  contact: Array<RestaurantContactModel>;
  businessHours: Array<BusinessHourModel>;
}

export class RestaurantContactModel {
  social: SocialContact;
  contactValue: string;
}

export class RestaurantAddressModel {
  address: string;
  latitude: number;
  longitude: number;
}

export class BusinessHourModel {
  day: number;
  startTime: TimeOnlyModel;
  endTime: TimeOnlyModel;
}

export class RestaurantPhotoModel {
  imageFiles: Array<File>;
  restaurantStatus: string;
}

export class RestaurantRegisterModel {
  personalInfo: ReviewerRegisterModel;
  restaurantInfo: RestaurantInfoModel;
  restaurantAdditionInfo: RestaurantPhotoModel;
}

export class TimeOnlyModel {
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  ticks: number;
}
