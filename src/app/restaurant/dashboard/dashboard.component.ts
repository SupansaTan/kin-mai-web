import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class RestaurantDashboardComponent implements OnInit {

  Info : any ={
    Rating: 4.3,
    Stars: [ "star", "star", "star", "star", "star_half" ],
    Menus: ["กระเพรา", "ข้าวผัด", "ก๋วยเตี๋ยว","ราดหน้า", "คั่วกลิ้ง", "ผัดมาม่า"]

  }

  Reviews: any = [ {}, {}, {}, {} ]



  constructor() { }

  ngOnInit(): void {
  }

}
