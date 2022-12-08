import { Component, OnInit } from '@angular/core';
import { AccountType } from 'src/enum/account-type.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string = '';
  isLogin: boolean = true;
  accountType: number = AccountType.ReviewerAndRestaurantOwner;
  restaurantName: string = '';
  isReviewerAccount: boolean = true;
  isMenuCollapsed: boolean = true;

  AccountTypeEnum = AccountType;

  constructor() { }

  ngOnInit(): void {
    this.username = 'Somchai';
    this.restaurantName = 'คุณป้าใจป้ำ';
  }

}
