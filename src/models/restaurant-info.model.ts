import { ReviewInfoModel } from "./review-info.model";

export class RestaurantInfoListModel {
  restaurantInfo: Array<RestaurantInfoItemModel>;
  restaurantCumulativeCount: number;
  totalRestaurant: number;
}

export class RestaurantInfoItemModel {
  restaurantId: string;
  restaurantName: string;
  rating: number;
  totalReview: number;
  startTime: string;
  endTime: string;
  distance: number;
  minPriceRate: number;
  maxPriceRate: number;
  imageCover: string;
  isFavorite: boolean;
  isReview: boolean;
  anotherImageCover: Array<string>;
}

export class RestaurantCardListModel {
  restaurantInfo: Array<RestaurantCardInfoModel>;
  totalRestaurant: number;
  restaurantCumulativeCount: number;
}

export class RestaurantCardInfoModel {
  restaurantId: string;
  restaurantName: string;
  rating: number;
  startTime: string;
  endTime: string;
  distance: number;
  minPriceRate: number;
  maxPriceRate: number;
  imageCover: string;
  description: string;
  totalReview: number;
  isFavorite: boolean;
  isReview: boolean;
}

export class RestaurantDetailModel {
  restaurantInfo: Restaurant;
  socialContact: Array<SocialContactModel>;
}


export class SocialContactModel {
  socialType: number;
  contactValue: string;
}

export class Restaurant {
  id: string;
  ownerId: string;
  name: string;
  imageLink: Array<string>;
  description: string;
  address: string;
  createAt: Date;
  deliveryType: Array<number>;
  paymentMethod: Array<number>;
  restaurantType: number;
  latitude: number;
  longitude: number;
  minPriceRate: number;
  maxPriceRate: number;
}
