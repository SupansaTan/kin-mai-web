import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-dessert',
  templateUrl: './modal-dessert.component.html',
  styleUrls: ['./modal-dessert.component.scss']
})
export class ModalDessertComponent  {
  @ViewChild('successModalDessert') successModalDessert: TemplateRef<any>;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  public openSuccessModal(): void {
    this.modalRef = this.modalService.show(this.successModalDessert, {
      class: 'modal-md modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
    
  }

  closeModal(): void {
    this.modalRef.hide();
  }

}
