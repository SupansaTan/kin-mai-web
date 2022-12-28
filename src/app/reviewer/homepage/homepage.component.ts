import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDessertComponent } from '../modal-dessert/modal-dessert.component';
import { ModalFoodComponent } from '../modal-food/modal-food.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class ReviewerHomepageComponent implements OnInit {
  @ViewChild('successModalFoodComponent') successModalFood: ModalFoodComponent;
  @ViewChild('successModalDessertComponent') successModalDessert: ModalDessertComponent;

  Info : any = {
  Stars: [ "star", "star", "star", "star", "star_half"],
  Images: [ "../../../assets/image/image.svg", "../../../assets/image/image.svg", "../../../assets/image/image.svg" ]
  }
  constructor() { }

  ngOnInit(): void {
  }

  openModalFood() {
    this.successModalFood.openSuccessModal();
  }

  openModalDessert() {
    this.successModalDessert.openSuccessModal();
  }
}
