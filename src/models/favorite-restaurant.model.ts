export class GetFavoriteRestaurantList {
  restaurantId: string;
  restaurantName: string;
  imageCover: string;
  minPriceRate: number;
  maxPriceRate: number;
  description: string;
  totalReview: number;
  isOpen: boolean;
  rating: number;
  distance: number;
}

export class GetFavoriteRestaurantRequest {
  userId: string;
  latitude: number;
  longitude: number;
}
