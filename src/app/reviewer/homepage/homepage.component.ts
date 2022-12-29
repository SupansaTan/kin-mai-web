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
  Images: [ "../../../assets/image/food1.jpg", "../../../assets/image/food2.jpg", "../../../assets/image/food3.jpg" ]
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
