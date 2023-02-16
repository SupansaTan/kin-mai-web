export class ReviewInfoModel {
  reviewId: string;
  rating: number;
  comment: string;
  imageLink: Array<string>;
  foodRecommendList: Array<string>;
  reviewLabelList: Array<number>;
}

export class GetReviewInfoRequest {
  userId: string;
  restaurantId: string;
}

export class UpdateReviewInfoRequest {
  ReviewId: string;
  Rating: number;
  Comment: string;
  RemoveImageLink: Array<string>;
  NewImageFile: Array<File>;
  FoodRecommendList: Array<string>;
  ReviewLabelList: Array<number>;
}
