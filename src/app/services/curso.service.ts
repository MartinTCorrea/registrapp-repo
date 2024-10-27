import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Alumno {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private alumnosCollection: AngularFirestoreCollection<Alumno>;
  alumnos: Observable<Alumno[]>;

  constructor(private firestore: AngularFirestore) {
    this.alumnosCollection = firestore.collection<Alumno>('alumnos');
    this.alumnos = this.alumnosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Alumno;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnos;
  }

  agregarAlumno(alumno: Alumno): Promise<void> {
    const id = this.firestore.createId();
    return this.alumnosCollection.doc(id).set({ ...alumno, id });
  }

  editarAlumno(alumno: Alumno): Promise<void> {
    return this.alumnosCollection.doc(alumno.id).update(alumno);
  }

  borrarAlumno(id: string): Promise<void> {
    return this.alumnosCollection.doc(id).delete();
  }
}
