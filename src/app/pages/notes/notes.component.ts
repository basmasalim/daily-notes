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
  noteBeingEdited: NotesData | null = null;


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

  saveToLocalStorage() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('kanban', JSON.stringify({
        notes: this.notes,
        inProgress: this.inProgress,
        done: this.done
      }));
    }
  }



  addNewNote(note: NotesData) {
    note._id = Date.now(); // أو استخدم UUID لو حبيت
    this.notes.push(note);
    this.syncState();
  }


  deleteNotes(noteIndex: number, arrayType: 'notes' | 'inProgress' | 'done') {
    this[arrayType].splice(noteIndex, 1);
    this.syncState()
  }
  updateNote(task: NotesData, taskId: number) {
    this.noteBeingEdited = { ...task, _id: taskId };
    this.showModal = true;
  }




  syncState() {
    this.saveToLocalStorage();
    this.updateCounters();
  }


  handleNoteUpdate(updatedNote: NotesData) {
    const lists = [this.notes, this.inProgress, this.done];

    for (let list of lists) {
      const index = list.findIndex(task => task._id === updatedNote._id);
      if (index !== -1) {
        list[index] = { ...updatedNote };
        break;
      }
    }

    this.syncState();
    this.closeModal();
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
    this.syncState()

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
    this.noteBeingEdited = null;
  }

}
