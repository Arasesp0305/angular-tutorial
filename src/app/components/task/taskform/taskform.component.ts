import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  customValidator,
  customValidatorPriority,
} from './taskform.validators';
import { Task, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css',
})
export class TaskformComponent {
  @Input()
  taskToEdit: Task | null = null; // Tarea a editar (null si estamos añadiendo)
  @Output()
  saveTask = new EventEmitter<Task>(); // Emitir tarea editada
  @Output()
  addTask = new EventEmitter<Task>();

  formTaskEdit: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formTaskEdit = formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      priority: ['', [Validators.required, customValidatorPriority()]],
      expirationDate: ['', [Validators.required, customValidator()]],
    });
  }

  onSubmit() {
    if (this.formTaskEdit.valid) {
      if (this.taskToEdit) {
        // Editar tarea existente
        const updatedTask: Task = {
          ...this.taskToEdit,
          ...this.formTaskEdit.value,
          expirationDate: new Date(this.formTaskEdit.value.expirationDate),
        };
        this.saveTask.emit(updatedTask); // Emitir tarea editada
      } else {
        const newTask: Task = new Task(
          Math.floor(Math.random() * 10000), // ID aleatorio
          this.formTaskEdit.value.name,
          this.formTaskEdit.value.description,
          this.formTaskEdit.value.priority,
          TaskStatus.PENDING,
          new Date(this.formTaskEdit.value.expirationDate),
          new Date(), // Fecha de creación
          false
        );
        this.addTask.emit(newTask);
      }

      this.formTaskEdit.reset();
    } else {
      console.log('El formulario tiene errores:', this.formTaskEdit.errors);
    }
  }
}
