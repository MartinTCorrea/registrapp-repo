import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Alumno {
  id?: string;
  nombre: string;
  edad: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private collectionName = "alumno";  // Cambiado de "alumno" a "estudiantes" si quieres que sea igual a la colección de Firebase

  constructor(private firestore: AngularFirestore) {}

  addAlumno(alumno: Alumno): Promise<void> {
    const id = this.firestore.createId(); 
    return this.firestore.collection(this.collectionName).doc(id).set({ ...alumno, id });
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.firestore.collection<Alumno>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Alumno;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  updateAlumno(id: string, alumno: Partial<Alumno>): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(alumno);
  }

  deleteAlumno(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
  addAsistencia(nombre_alumno: string, presente: boolean): Promise<void> {
    const fecha = new Date().toLocaleDateString("en-GB"); // Fecha en formato "dd-mm-yyyy"
    const id = this.firestore.createId();
    return this.firestore.collection("asistencia").doc(id).set({
        fecha,
        nombre_alumno,
        presente
    });
}
}
