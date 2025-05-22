import { Component, signal, WritableSignal } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { NotesData } from '../../core/interfaces/notes-data';

@Component({
  selector: 'app-notes',
  imports: [ModalComponent, CdkDropList, CdkDrag],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  modalVisible = signal(false);
  notes = signal<NotesData[]>([]);
  inProgress = signal<NotesData[]>([]);
  done = signal<NotesData[]>([]);

  deleteNotes(noteId: number) {
    this.notes.set([]);
    this.inProgress.set([]);
    this.done.set([]);
  }

  editNotes(noteId: number, note: NotesData) {
    // this.notes.update((notes) => {
    //   const index = notes.findIndex((note) => note._id === noteId);
    //   notes[index] = note;
    //   return notes;
    // });
  }

  drop(event: CdkDragDrop<WritableSignal<NotesData[]>>) {
    const prevData = event.previousContainer.data();
    const currData = event.container.data();

    if (event.previousContainer === event.container) {
      const updated = [...currData];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      event.container.data.set(updated);
    } else {
      const prevUpdated = [...prevData];
      const currUpdated = [...currData];

      transferArrayItem(
        prevUpdated,
        currUpdated,
        event.previousIndex,
        event.currentIndex
      );

      event.previousContainer.data.set(prevUpdated);
      event.container.data.set(currUpdated);
    }
  }

  openModal() {
    this.modalVisible.set(true);
  }

  closeModal() {
    this.modalVisible.set(false);
  }
}
