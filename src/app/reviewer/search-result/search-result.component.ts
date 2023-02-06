import { Component, OnInit } from '@angular/core';
import { NgbCalendarIslamicUmalqura } from '@ng-bootstrap/ng-bootstrap';

export interface RestaurantInfo {
  Title: string,
  PriceRate: Array<number>,
  Rating: number,
  TotalReview: number,
  Photo: Array<string>,
  Status: string
  IsFav: boolean,
  Types: number,
  Delivery: Array<number>,
  Payments: Array<number>,   
  MyReview: {
    Star: number,
    Comment: string,
    Photo: Array<string>,
    RecommendMenu: Array<string>,
  } | null
} 

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchRestaurantComponent implements OnInit {

  RestaurantList: Array<RestaurantInfo> = [
    {
      Title: 'ตำแซ่บ',
      PriceRate: [60,200],
      Rating: 3.5,
      TotalReview: 51,
      Photo: [ "../../../assets/image/somtam.jpg", "../../../assets/image/food-real.jpg"],
      Status: "อยู่ใกล้ๆประตูหลังมอเลย แวะมาลองกันได้นะ",
      IsFav: false,
      Types: 1,
      Delivery: [1] ,
      Payments: [1],   
      MyReview: {
        Star: 5,
        Comment: "อร่อยจ้า",
        Photo: ["../../../assets/image/somtam.jpg"],
        RecommendMenu: ["ตำไทย","ตำปลาร้า"]
      }   
    },
    {
      Title: 'ตำแซ่บมากกว่า',
      PriceRate: [70,300],
      Rating: 4,
      TotalReview: 60,
      Photo: [ "../../assets/image/somtam.jpg", "../../../assets/image/food-real.jpg"],
      Status: "อยู่ใกล้ๆประตูหลังมอเลย เลยร้านตำแซ่บมานิดนึง",
      IsFav: true,
      Types: 2,
      Delivery: [2],
      Payments: [2],   
      MyReview: null  
    },
    {
      Title: 'ส้มตำ',
      PriceRate: [80,200],
      Rating: 4.5,
      TotalReview: 50,
      Photo: [ "../../assets/image/somtam.jpg", "../../../assets/image/food-real.jpg"],
      Status: "ส้มตำจ้า",
      IsFav: true,
      Types: 2,
      Delivery: [1,2],
      Payments: [1,2],   
      MyReview: null  
    },
  ] 

  isReview: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  toggleFav(index:any) {
    this.RestaurantList[index].IsFav = !this.RestaurantList[index].IsFav
  }

}
