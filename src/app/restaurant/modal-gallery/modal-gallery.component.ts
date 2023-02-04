import { Component, EventEmitter, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-modal-gallery',
  templateUrl: './modal-gallery.component.html',
  styleUrls: ['./modal-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalGalleryComponent {

  @ViewChild('modalGallery') modalGallery: TemplateRef<any>;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalRef: BsModalRef;

  thumbsSwiper: any;

  Info: any = {
    Images: [ "../../../assets/image/noodle.jpg", "../../../assets/image/food1.jpg", "../../../assets/image/food2.jpg"
                , "../../../assets/image/food3.jpg", "../../../assets/image/icecream.jpg", "../../../assets/image/juice.jpg"
                , "../../../assets/image/dessert.jpg", "../../../assets/image/cafe.jpg", "../../../assets/image/interfood.jpg"]
  }

  constructor(
    private modalService: BsModalService,
  ) { }

  public openSuccessModal(): void {
    this.modalRef = this.modalService.show(this.modalGallery, {
      class: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }

}
