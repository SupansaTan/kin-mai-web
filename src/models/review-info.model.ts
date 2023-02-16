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
