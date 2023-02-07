import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-dessert',
  templateUrl: './modal-dessert.component.html',
  styleUrls: ['./modal-dessert.component.scss']
})
export class ModalDessertComponent  {
  @ViewChild('modalDessert') modalDessert: TemplateRef<any>;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSelectedCategory = new EventEmitter<{ isSavory: boolean, id: number, label: string }>();

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  public openSuccessModal(): void {
    this.modalRef = this.modalService.show(this.modalDessert, {
      class: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  selectedCategory(id: number, label: string) {
    let item = {
      isSavory: false,
      id: id,
      label: label
    }
    this.onSelectedCategory.emit(item);
    this.closeModal();
  }
}
