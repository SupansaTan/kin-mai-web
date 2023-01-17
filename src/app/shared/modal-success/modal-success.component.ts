import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.scss']
})
export class ModalSuccessComponent {
  @ViewChild('successModal') successModal: TemplateRef<any>;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalRef: BsModalRef;
  isSuccess = false;
  text: string = '';

  constructor(private modalService: BsModalService) { }

  public openSuccessModal(isSuccess: boolean, message: string): void {
    this.isSuccess = isSuccess;
    this.text = message;
    this.modalRef = this.modalService.show(this.successModal, {
      class: 'modal-md modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(): void {
    this.modalRef.hide();
    this.closeModalEvent.emit(true);
  }
}
