import { DeliveryType } from "src/enum/delivery-type.enum";
import { FoodCategories } from "src/enum/food-category.enum";
import { PaymentMethod } from "src/enum/payment-method.enum";
import { SocialContact } from "src/enum/social-contact.enum";

export class GetRestaurantDetailRequestModel {
  restaurantId: string;
  userId: string;
  latitude: number;
  longitude: number;
}

export class SocialContactItemModel {
  SocialType: SocialContact;
  ContactValue: string;
}

export class GetRestaurantDetailModel {
  restaurantId: string;
  restaurantName: string;
  minPriceRate: number;
  maxPriceRate: number;
  distance: number;
  rating: number;
  startTime: string;
  endTime: string;
  totalReview: number;
  isReview: boolean;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  foodRecommendList: Array<string>;
  imageCover: Array<string>;
  categoryList: Array<FoodCategories>;
  deliveryTypeList: Array<DeliveryType>;
  paymentMethodList: Array<PaymentMethod>;
  socialContactList: Array<SocialContactItemModel>;
}
