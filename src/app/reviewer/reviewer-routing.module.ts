import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomFoodComponent } from './random-food/random-food.component';
import { ReviewerHomepageComponent } from './homepage/homepage.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { AccountType } from 'src/enum/account-type.enum';
import { AccessLevel } from 'src/enum/access-level.enum';

const routes: Routes = [
  {
    path: '',
    component: ReviewerHomepageComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccountType.Reviewer, AccessLevel.Public],
    },
  },
  {
    path: 'random',
    component: RandomFoodComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccountType.Reviewer],
    },
  },
  {
    path: 'restaurant',
    component: RestaurantDetailComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccountType.Reviewer, AccessLevel.Public],
    },
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccountType.Reviewer],
    },
  },
  {
    path: 'playlist-detail',
    component: PlaylistDetailComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccountType.Reviewer],
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
