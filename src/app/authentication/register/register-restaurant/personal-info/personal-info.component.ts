import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/shared/password-match-validator.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Output() isFormValid = new EventEmitter<boolean>();

  registerReviewerForm: FormGroup;
  isShowPassword: boolean = false;
  isShowConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerReviewerForm = this.fb.group({
      firstname: new FormControl('', [
        Validators.minLength(3),
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.minLength(3),
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ])
    }, {
      validators: ConfirmPasswordValidator.MatchPassword
    });
  }

  ngOnInit(): void {
  }

  @Input()
  set stage(value: number) {
    if (value === 4) {
      this.registerReviewerForm.disable();
    } else {
      this.registerReviewerForm.enable();
    }
  }

  checkFormIsValid() {
    this.registerReviewerForm.markAllAsTouched();

    if (this.registerReviewerForm.valid) {
      this.isFormValid.emit(true);
    }
  }
}
