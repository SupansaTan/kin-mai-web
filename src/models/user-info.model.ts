export interface UserInfoModel {
  userId: string;
  userName: string;
  restaurantId: string;
  restaurantName: string;
  userType: number;
}

export interface UserProfileModel {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isLoginWithGoogle: boolean;
}

export class UpdateUserProfile {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
}
