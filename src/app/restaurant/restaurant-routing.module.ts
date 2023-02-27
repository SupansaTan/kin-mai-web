import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { AccessLevel } from 'src/enum/access-level.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantDashboardComponent } from './dashboard/dashboard.component';
import { EditRestaurantDetailComponent } from './edit-detail/edit-detail.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuardService } from '../service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: RestaurantDashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.RestaurantOwner],
    },
  },
  {
    path: 'detail',
    component: DetailComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.RestaurantOwner],
    },
  },
  {
    path: 'edit',
    component: EditRestaurantDetailComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.RestaurantOwner],
    },
  },
  {
    path: 'qr-code',
    component: GenerateQrCodeComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.RestaurantOwner],
    },
  },
  {
    path: '',
    redirectTo: '/restaurant',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
