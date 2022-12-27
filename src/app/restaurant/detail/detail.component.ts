import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  Info: any = {
    Rating: 3.5,
    TotalReview: 51,
    Menus: ["กระเพรา", "ข้าวผัด", "ก๋วยเตี๋ยว"],
    Stars: [ "star", "star", "star", "star_half", "star_empty" ],
    Payments: [ "เงินสด", "รับโอน" ],
    Images: [ "../../../assets/image/image.jpg", "../../../assets/image/image.jpg", "../../../assets/image/image.jpg" ],
    Types: [ "อาหาร", "เครื่องดื่ม"],
  }
  
  

  constructor() { }

  ngOnInit(): void {
  }

}
