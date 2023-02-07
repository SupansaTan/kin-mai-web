export class GetRestaurantNearMeRequestModel {
  userId: string;
  latitude: number;
  longitude: number;
  skip: number;
  take: number;
}

export class GetRestaurantListFromFilterRequestModel {
  userId: string;
  latitude: number;
  longitude: number;
  skip: number;
  take: number;
  keywords: string;
  isOpen: boolean;
  categoryType: Array<number>;
  deliveryType: Array<number>;
  paymentMethod: Array<number>;
}

export class SetFavoriteRestaurantRequestModel {
  userId: string;
  restaurantId: string;
  isFavorite: boolean;
}
