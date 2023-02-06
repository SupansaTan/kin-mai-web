export class GetRestaurantNearMeRequestModel {
  userId: string;
  latitude: number;
  longitude: number;
  skip: number;
  take: number;
}

export class SetFavoriteRestaurantRequestModel {
  userId: string;
  restaurantId: string;
  isFavorite: boolean;
}
