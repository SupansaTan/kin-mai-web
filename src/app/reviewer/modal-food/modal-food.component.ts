import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-modal-food',
  templateUrl: './modal-food.component.html',
  styleUrls: ['./modal-food.component.scss']
})
export class ModalFoodComponent {
  @ViewChild('modalFoodCategory') modalFoodCategory: TemplateRef<any>;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSelectedCategory = new EventEmitter<{ isSavory: boolean, id: number, label: string }>();

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  public openSuccessModal(): void {
    this.modalRef = this.modalService.show(this.modalFoodCategory, {
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
      isSavory: true,
      id: id,
      label: label
    }
    this.onSelectedCategory.emit(item);
    this.closeModal();
  }
}
