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
  category: Array<FoodCategories>;
  paymentMethod: Array<PaymentMethod>;
  contact: Array<RestaurantContactModel>;
  businessHour: Array<BusinessHourModel>;
}

export class RestaurantContactModel {
  social: SocialContact;
  contactValue: string;
}

export class RestaurantAddressModel {
  address: string;
  attitude: number;
  longtitude: number;
}

export class BusinessHourModel {
  day: number;
  startTime: number;
  endTime: number;
}

export class RestaurantPhotoModel {
  photo: Array<string>;
  restaurantStatus: string;
}

export class RestaurantOwnerRegisterModel {
  personalInfo: ReviewerRegisterModel;
}
