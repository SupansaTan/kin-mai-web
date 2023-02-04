import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalGalleryComponent } from '../modal-gallery/modal-gallery.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @ViewChild('modalGalleryComponent') modalGallery: ModalGalleryComponent;

  Info: any = {
    Rating: 3.5,
    TotalReview: 51,
    Menus: ["กระเพรา", "ข้าวผัด", "ก๋วยเตี๋ยว","ราดหน้า", "มาม่าผัด", "เขียวหวาน"],
    Stars: [ "star", "star", "star", "star_half", "star_empty" ],
    Payments: [ "เงินสด", "รับโอน" ],
    Images: [ "../../../assets/image/noodle.jpg", "../../../assets/image/food1.jpg", "../../../assets/image/food2.jpg"
              , "../../../assets/image/food3.jpg", "../../../assets/image/icecream.jpg", "../../../assets/image/juice.jpg"
              , "../../../assets/image/dessert.jpg", "../../../assets/image/cafe.jpg", "../../../assets/image/interfood.jpg"],
    Types: [ "อาหาร", "เครื่องดื่ม"],
  }

  constructor() { }

  ngOnInit(): void {
  }

  openModalGallery() {
    this.modalGallery.openSuccessModal();
  }


}
