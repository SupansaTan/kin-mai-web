import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { environment } from 'src/environments/environment';

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
  @Input() ImageData: Array<string>;

  modalRef: BsModalRef;
  thumbsSwiper: any;
  awsS3Url = environment.awsS3Url;

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
