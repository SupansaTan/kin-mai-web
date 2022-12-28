import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {

  Info: any = {
    Rating: 3.5,
    TotalReview: 51,
    Menus: ["กระเพรา", "ข้าวผัด", "ก๋วยเตี๋ยว","ราดหน้า", "คั่วกลิ้ง", "ผัดมาม่า"],
    Stars: [ "star", "star", "star", "star_half", "star_empty" ],
    Payments: [ "เงินสด", "รับโอน" ],
    Images: [ "../../../assets/image/food-real.jpg", "../../../assets/image/food-real.jpg"],
    Types: [ "อาหาร", "เครื่องดื่ม"],
  }

  Reviews: any = [ {}, {}, {}, ]

  constructor() { }

  ngOnInit(): void {
  }

}
