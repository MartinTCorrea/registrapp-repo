import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Alumno {
  id?: string;
  nombre: string;
}

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {
  alumnos$!: Observable<Alumno[]>; // Usamos el operador de aserción
  nuevoAlumno: Alumno = { nombre: '' };
  alumnoAEditar: Alumno | null = null;

  private collectionName = 'alumnos';

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.alumnos$ = this.getAlumnos(); // Se inicializa aquí
    this.alumnos$.subscribe(alumnos => {
        console.log('Alumnos:', alumnos); // Verifica qué se está recuperando
    });
}


getAlumnos(): Observable<Alumno[]> {
  const alumnosCollection = collection(this.firestore, 'alumnos');
  return collectionData(alumnosCollection) as Observable<Alumno[]>;
}


  async agregarAlumno() {
    if (this.nuevoAlumno.nombre) {
      const alumnosCollection = collection(this.firestore, this.collectionName);
      await addDoc(alumnosCollection, this.nuevoAlumno);
      this.nuevoAlumno = { nombre: '' };
    }
  }

  // Aquí está la función editarAlumno
  editarAlumno(alumno: Alumno) {
    this.alumnoAEditar = { ...alumno }; // Clonamos el alumno para editarlo
  }

  async actualizarAlumno() {
    if (this.alumnoAEditar) {
      const alumnoDoc = doc(this.firestore, `${this.collectionName}/${this.alumnoAEditar.id}`);
      await updateDoc(alumnoDoc, { nombre: this.alumnoAEditar.nombre });
      this.alumnoAEditar = null; // Reiniciamos el alumno a editar
    }
  }

  async borrarAlumno(id: string) {
    const alumnoDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(alumnoDoc);
  }
}
