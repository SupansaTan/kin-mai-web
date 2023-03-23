export class GetReviewInfoModel {
  username: string;
  rating: number;
  comment: string;
  createdDateDiff: number;
  imageReviewList: Array<string>;
  foodRecommendList: Array<string>;
  reviewLabelList: Array<number>;
  restaurantReply: string;
}

export class GetReviewInfoListModel {
  reviewList: Array<GetReviewInfoModel>;
  totalReview: number;
  totalReviewHaveImage: number;
  totalReviewHaveComment: number;
  totalReviewHaveFoodRecommend: number;
}

export class GetReviewInfoFilterModel {
  restaurantId: string;
  keywords: string;
  rating: number;
  isOnlyReviewHaveImage: boolean;
  isOnlyReviewHaveComment: boolean;
  isOnlyReviewHaveFoodRecommend: boolean;
}
