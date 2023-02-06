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
