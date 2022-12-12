import { Component, OnInit } from '@angular/core';
import { AccountType } from 'src/enum/account-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSelectedUserType: boolean = false;
  userType: AccountType = AccountType.Reviewer;
  accountType = AccountType;

  constructor() { }

  ngOnInit(): void {
  }

  setUserType(userType: AccountType) {
    this.isSelectedUserType = true;
    this.userType = userType;
  }
}
