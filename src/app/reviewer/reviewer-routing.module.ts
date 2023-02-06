import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomFoodComponent } from './random-food/random-food.component';
import { ReviewerHomepageComponent } from './homepage/homepage.component';
import { SearchRestaurantComponent } from './search-result/search-result.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { AccountType } from 'src/enum/account-type.enum';

const routes: Routes = [
  {
    path: '',
    component: ReviewerHomepageComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccountType.Reviewer],
    },
  },
  {
    path: 'search',
    component: SearchRestaurantComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccountType.Reviewer],
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
      AccessLevel: [AccountType.Reviewer],
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
