import { Router } from '@angular/router';
import {ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { DrinkAndDessertCategory, FoodCategory } from 'src/constant/food-category.constant';
import Swal from 'sweetalert2';
import { PageLink } from 'src/constant/path-link.constant';

@Component({
  selector: 'app-random-food',
  templateUrl: './random-food.component.html',
  styleUrls: ['./random-food.component.scss']
})
export class RandomFoodComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  categoryList: Array<{ id: number, name: string }>;
  randomResult: { id: number, name: string };
  isPlayingMusic: boolean = false;
  isRandomAlready: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.categoryList = [...FoodCategory, ...DrinkAndDessertCategory];
  }

  ImageClick() {
    this.randomResult = this.categoryList[Math.floor(Math.random() * this.categoryList.length)];
    Swal.fire({
      title: this.randomResult.name,
      timer: 5000
    });
    this.isRandomAlready = true;
  }

  play() {
    this.audioPlayer.nativeElement.play();
    this.isPlayingMusic = true;
  }

  pause() {
    this.audioPlayer.nativeElement.pause();
    this.isPlayingMusic = false;
  }

  routeToHomepage() {
    this.router.navigate([PageLink.reviewer.homepage, {
      categoryType: this.randomResult.id,
    }]);
  }
}
