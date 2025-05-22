import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  handleOverlayClick() {
    this.onClose.emit();
  }

}
