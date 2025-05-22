import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

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
    console.log('addNote');
  }
  updateNote() { }

  handleOverlayClick() {
    this.onClose.emit();
  }
}
