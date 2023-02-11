export class RestaurantInfoListModel {
  restaurantInfo: Array<RestaurantInfoItemModel>;
  restaurantCumulativeCount: number;
  totalRestaurant: number;
}

export class RestaurantInfoItemModel {
  restaurantId: string;
  restaurantName: string;
  rating: number;
  startTime: string;
  endTime: string;
  distance: number;
  minPriceRate: number;
  maxPriceRate: number;
  imageCover: string;
  isFavorite: boolean;
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
