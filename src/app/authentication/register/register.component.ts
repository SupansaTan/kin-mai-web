import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountType } from 'src/enum/account-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private sub: any;

  isSelectedUserType: boolean = false;
  userType: AccountType = AccountType.Reviewer;
  accountType = AccountType;
  firstName: string;
  lastName: string;
  email: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.firstName = params['firstName'];
      this.lastName = params['lastName'];
      this.email = params['email'];
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setUserType(userType: AccountType) {
    this.isSelectedUserType = true;
    this.userType = userType;
  }

  resetUserType() {
    this.isSelectedUserType = false;
  }
}
