import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-modal-gallery',
  templateUrl: './modal-gallery.component.html',
  styleUrls: ['./modal-gallery.component.scss']
})
export class ModalGalleryComponent {

  @ViewChild('modalGallery') modalGallery: TemplateRef<any>;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalRef: BsModalRef;

  Info: any = {
    Images: [ "../../../assets/image/food-real.jpg", "../../../assets/image/food-real.jpg", "../../../assets/image/food-real.jpg"
                , "../../../assets/image/food-real.jpg", "../../../assets/image/food-real.jpg", "../../../assets/image/food-real.jpg"]
  }

  constructor(private modalService: BsModalService) { }

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
