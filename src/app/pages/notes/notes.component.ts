import { Component, OnInit, signal, WritableSignal } from '@angular/core';
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
export class NotesComponent implements OnInit {
  showModal: boolean = false;
  notesCount: number = 0;
  inProgressCount: number = 0;
  doneCount: number = 0;

  notes: NotesData[] = [];
  inProgress: NotesData[] = [];
  done: NotesData[] = [];

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage) {
      const saved = localStorage.getItem('kanban');
      if (saved) {
        const data = JSON.parse(saved);
        this.notes = data.notes || [];
        this.inProgress = data.inProgress || [];
        this.done = data.done || [];
      }
    }
  }


  ngOnChanges() {
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('kanban', JSON.stringify({
        notes: this.notes,
        inProgress: this.inProgress,
        done: this.done
      }));
    }
  }



  deleteNotes(noteIndex: number, arrayType: 'notes' | 'inProgress' | 'done') {
    this[arrayType].splice(noteIndex, 1);
  }

  editNotes(noteId: number, note: NotesData) {
  }

  addNewNote(note: NotesData) {
    this.notes.push(note);
    this.saveToLocalStorage();
  }


  drop(event: CdkDragDrop<NotesData[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.saveToLocalStorage();
    this.updateCounters();
  }

  updateCounters() {
    this.notesCount = this.notes.length;
    this.inProgressCount = this.inProgress.length;
    this.doneCount = this.done.length;
  }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
