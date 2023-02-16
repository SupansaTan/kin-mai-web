export class AddReviewRequestModel {
  UserId: string;
  RestaurantId: string;
  Rating: number;
  Comment: string;
  ReviewLabelList: Array<number>;
  FoodRecommendList: Array<string>;
  ImageFiles: Array<File>;
}
