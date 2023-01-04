import { Component, OnInit, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-modal-review',
  templateUrl: './modal-review.component.html',
  styleUrls: ['./modal-review.component.scss']
})
export class ModalReviewComponent {

  @ViewChild('modalReview') modalReview: TemplateRef<any>;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalRef: BsModalRef;

  Info: any = {
    Rating: 3.5,
    TotalReview: 51,
    Menus: ["กระเพรา", "ข้าวผัด", "ก๋วยเตี๋ยว","ราดหน้า", "คั่วกลิ้ง", "ผัดมาม่า"],
    Stars: [ "star_empty", "star_empty", "star_empty", "star_empty", "star_empty" ],
    Payments: [ "เงินสด", "รับโอน" ],
    Images: [ "../../../assets/image/food-real.jpg", "../../../assets/image/food-real.jpg"],
    Types: [ "อาหาร", "เครื่องดื่ม"],
  }

  currentRate = 0;

  constructor(private modalService: BsModalService) { }

  public openSuccessModal(): void {
    this.modalRef = this.modalService.show(this.modalReview, {
      class: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }

}
