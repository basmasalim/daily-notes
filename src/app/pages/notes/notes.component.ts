import { Component, signal } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-notes',
  imports: [ModalComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  modalVisible = signal(false);

  openModal() {
    this.modalVisible.set(true);
  }

  closeModal() {
    this.modalVisible.set(false);
  }

}
