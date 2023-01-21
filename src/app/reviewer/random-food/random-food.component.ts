import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-random-food',
  templateUrl: './random-food.component.html',
  styleUrls: ['./random-food.component.scss']
})
export class RandomFoodComponent implements OnInit {

  Foods=["อาหารไทย","อาหารนานาชาติ","อาหารตามสั่ง","อาหารฮาลาล","บุฟเฟ่ห์","สตรีทฟู๊ด/รถเข็น","อาหารอีสาน","ก๋วยเตี๋ยว","อาหารคลีน"];
  randomWord: string;


  constructor() { }

  ngOnInit(): void {
  }

  ImageClick() {
    this.randomWord = this.Foods[Math.floor(Math.random() * this.Foods.length)];
    Swal.fire(this.randomWord);
  }

}
