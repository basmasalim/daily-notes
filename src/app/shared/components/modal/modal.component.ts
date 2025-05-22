import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotesData } from '../../../core/interfaces/notes-data';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() noteAdded = new EventEmitter<NotesData>();
  modalForm!: FormGroup;
  isEditEnabled = signal(false);

  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.modalForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
    });
  }

  onSubmit(): void {
    console.log(this.modalForm.value);
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

  }

  handleOverlayClick() {
    this.onClose.emit();
  }
}
