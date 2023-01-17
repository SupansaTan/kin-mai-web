import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-random-food',
  templateUrl: './random-food.component.html',
  styleUrls: ['./random-food.component.scss']
})
export class RandomFoodComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ImageClick() {
    Swal.fire('อาหารไทย');
  }
}
