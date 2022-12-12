import { ReviewerStepItems, StepItem } from './../../../../models/step-item.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-regis-review',
  templateUrl: './register-reviewer.component.html',
  styleUrls: ['./register-reviewer.component.scss']
})
export class RegisterReviewerComponent implements OnInit {
  @Output() onResetUserType = new EventEmitter<boolean>();

  steps: Array<StepItem> = new Array<StepItem>();
  registerForm: FormGroup;
  stage: number = 1;
  isShowPassword: boolean = false;
  isShowConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
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
    });
  }

  ngOnInit(): void {
    this.steps = ReviewerStepItems;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  changeToPreviousStage() {
    this.stage = 1;
  }

  changeToNextStage() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.registerForm.disable();
      this.stage = 2;
    }
  }

  resetUserType() {
    this.onResetUserType.emit();
  }

  submit() {
    if (this.registerForm.valid) {
      // form valid
    }
  }
}
