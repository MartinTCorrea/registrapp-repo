// src/app/components/alumno-form/alumno-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from 'src/app/services/alumno.model';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.scss'],
})
export class AlumnoFormComponent {
  @Input() alumno!: Alumno; // Recibe el alumno para editar
  @Output() save = new EventEmitter<Alumno>(); // Emite el alumno al ser guardado
  @Output() cancel = new EventEmitter<void>(); // Emite al cancelar

  onSubmit() {
    this.save.emit(this.alumno);
    this.alumno = { nombre: '' }; // Resetear el formulario
  }

  onCancel() {
    this.cancel.emit(); // Emitir el evento de cancelación
  }
}
