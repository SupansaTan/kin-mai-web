import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class ReviewerHomepageComponent implements OnInit {
  Info : any = {
  Stars: [ "star", "star", "star", "star", "star_half"],
  Images: [ "../../../assets/image/image.svg", "../../../assets/image/image.svg", "../../../assets/image/image.svg" ]
  }
  constructor() { }

  ngOnInit(): void {
  }

}
