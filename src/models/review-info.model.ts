export class ReviewInfoModel {
  reviewId: string;
  rating: number;
  comment: string;
  imageLink: Array<string>;
  foodRecommendList: Array<string>;
  reviewLabelList: Array<number>;
  createAt: Date;
  reviewTimeString: string;
  userId: string;
  userName: string;
  replyComment: string;
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

export class UpdateReviewReplyRequest {
  reviewId: string;
  replyComment: string;
}
