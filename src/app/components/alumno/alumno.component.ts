import { Component, OnInit } from '@angular/core';
import { AlumnoService, Alumno } from 'src/app/services/alumno.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
})
export class AlumnoComponent implements OnInit {
  alumnos: Alumno[] = [];
  alumno: Alumno = { nombre: '', edad: 0 };
  isEdit: boolean = false;
  editAlumnoId: string | null | undefined = null;
  

  errorMessage: string | null = null;

  constructor(
    private alumnoService: AlumnoService,
    private aService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAlumnos();
  }

  getAlumnos() {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  addAlumno() {
    this.errorMessage = null; // Limpiar mensaje de error
  
    // Validar nombre y edad
    if (!this.alumno.nombre || this.alumno.nombre.trim() === "") {
      this.errorMessage = "Por favor, ingresa un nombre.";
      return;
    }
    
    if (isNaN(this.alumno.edad) || this.alumno.edad <= 0) {
      this.errorMessage = "Por favor, ingresa una edad válida mayor a 0.";
      return;
    }
  
    console.log("boton presionado para", this.alumno);
    if (this.isEdit && this.editAlumnoId) {
      // Actualizar el alumno existente
      this.alumnoService.updateAlumno(this.editAlumnoId, this.alumno).then(() => {
        console.log("Alumno actualizado con éxito");
        this.resetForm(); // Restablecer el formulario después de actualizar
        this.isEdit = false; // Cambiar el estado a no editar
        this.editAlumnoId = null; // Limpiar el ID del alumno editado
        this.getAlumnos(); // Obtener la lista actualizada de alumnos
      }).catch(error => console.error("Error al actualizar el alumno:", error));
    } else {
      // Agregar un nuevo alumno
      this.alumnoService.addAlumno(this.alumno).then(() => {
        console.log("Alumno agregado con éxito");
        this.resetForm(); // Restablecer el formulario después de añadir
        this.getAlumnos();
      }).catch(error => console.error("Error al agregar el alumno:", error));
    }
  }
  
  resetForm() {
    this.alumno = { nombre: '', edad: 0 }; // Restablecer el objeto alumno
    this.errorMessage = null; // Limpiar el mensaje de error
  }

  editAlumno(alumno: Alumno) {
    this.isEdit = true;
    this.editAlumnoId = alumno.id;
    this.alumno = { ...alumno };
  }

  deleteAlumno(id: string) {
    this.alumnoService.deleteAlumno(id).then(() => {
      this.getAlumnos();
    });
  }

  
  
  logout() {
    this.aService.logout();
    alert("sesión cerrada");
    this.router.navigate(["home"]);
  }
}
