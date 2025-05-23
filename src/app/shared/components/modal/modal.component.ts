import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotesData } from '../../../core/interfaces/notes-data';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() noteAdded = new EventEmitter<NotesData>();
  @Input() noteToEdit?: NotesData | null = null;
  @Output() noteUpdated = new EventEmitter<NotesData>();
  modalForm!: FormGroup;
  isEditEnabled = signal(false);

  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
    if (this.noteToEdit) {
      this.modalForm.patchValue(this.noteToEdit);
    }
  }

  ngOnChanges(changes: any): void {
    if (changes['noteToEdit'] && this.noteToEdit) {
      this.modalForm.patchValue({
        title: this.noteToEdit.title,
        description: this.noteToEdit.description,
      });
    } else if (changes['noteToEdit'] && !this.noteToEdit && this.modalForm) {
      this.modalForm.reset();
    }
  }

  initForm(): void {
    this.modalForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(100)],
    });
  }

  onSubmit(): void {
    if (this.modalForm.invalid) return;

    const note: NotesData = {
      _id: this.noteToEdit?._id || Date.now().toString(),
      ...this.modalForm.value
    };


    if (this.noteToEdit) {
      this.noteUpdated.emit(note);
    } else {
      this.noteAdded.emit(note);
    }

    this.modalForm.reset();
  }



  addNote() {
    if (this.modalForm.valid) {
      const newNote: NotesData = {
        title: this.modalForm.value.title,
        description: this.modalForm.value.description,
      };
      const existingNotes: any[] = JSON.parse(localStorage.getItem('notes') || '[]');
      existingNotes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(existingNotes));

      this.noteAdded.emit(newNote);
      this.modalForm.reset();
    }
    this.onClose.emit();
  }
  updateNote() {
    if (this.modalForm.valid && this.noteToEdit) {
      const updatedNote: NotesData = {
        ...this.noteToEdit,
        title: this.modalForm.value.title,
        description: this.modalForm.value.description,
      };

      this.noteUpdated.emit(updatedNote);
      this.modalForm.reset();
      this.onClose.emit();
    }
  }


  handleOverlayClick() {
    this.onClose.emit();
  }
}
