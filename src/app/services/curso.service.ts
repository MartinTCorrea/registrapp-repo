// src/app/services/curso.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Alumno } from './alumno.model'; // Asegúrate de tener un modelo de Alumno

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private alumnosCollection = this.firestore.collection<Alumno>('alumnos');

  constructor(private firestore: AngularFirestore) {}

  getAlumnos() {
    return this.alumnosCollection.valueChanges({ idField: 'id' });
  }

  agregarAlumno(alumno: Alumno) {
    return this.alumnosCollection.add(alumno);
  }

  editarAlumno(id: string, alumno: Alumno) {
    return this.alumnosCollection.doc(id).update(alumno);
  }

  borrarAlumno(id: string) {
    return this.alumnosCollection.doc(id).delete();
  }
}
