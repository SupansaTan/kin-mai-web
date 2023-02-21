import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomFoodComponent } from './random-food/random-food.component';
import { ReviewerHomepageComponent } from './homepage/homepage.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { AccessLevel } from 'src/enum/access-level.enum';

const routes: Routes = [
  {
    path: '',
    component: ReviewerHomepageComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.Reviewer, AccessLevel.Public],
    },
  },
  {
    path: 'random',
    component: RandomFoodComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.Reviewer],
    },
  },
  {
    path: 'restaurant',
    component: RestaurantDetailComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.Reviewer, AccessLevel.Public],
    },
  },
  {
    path: 'profile',
    component: EditProfileComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.Reviewer, AccessLevel.Public],
    },
  },
 
  {
    path: '',
    redirectTo: '/reviewer',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerRoutingModule { }
