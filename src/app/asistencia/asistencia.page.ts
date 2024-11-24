import { Component, OnInit } from '@angular/core';
import { AlumnoService, Alumno } from 'src/app/services/alumno.service';
import { AsistenciaService } from '../services/asistencia.service';

interface Asistencia {
  alumnoId: string;
  fecha: string;
  presente: boolean;
}

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistencia: Asistencia = { alumnoId: '', fecha: '', presente: false };
  asistencias: Asistencia[] = [];
  estudiantes: Alumno[] = [];  // Ahora tipo Alumno, ya que los alumnos son objetos de esa interfaz.
  fechaActual: string = '';
  errorAlumnoId: boolean = false;
  errorFecha: boolean = false;

  constructor(private alumnoService: AlumnoService, private asistenciaService: AsistenciaService) {}

  ngOnInit() {
    this.cargarEstudiantes(); // Cargar la lista de estudiantes desde Firestore.
    this.setFechaActual(); // Establecer la fecha actual.
    this.cargarAsistencias(); // Cargar las asistencias guardadas (desde localStorage, en este caso).
  }

  cargarEstudiantes() {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.estudiantes = data.filter(estudiante => estudiante.id); // Filtrar estudiantes con id válido
    });
  }
  

  setFechaActual() {
    const hoy = new Date();
    this.fechaActual = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  cargarAsistencias() {
    const storedAsistencias = localStorage.getItem('asistencias');
    if (storedAsistencias) {
      this.asistencias = JSON.parse(storedAsistencias);
    }
  }

  guardarAsistencias() {
    localStorage.setItem('asistencias', JSON.stringify(this.asistencias));
  }

  addAsistencia() {
    this.errorAlumnoId = !this.asistencia.alumnoId;
    this.errorFecha = !this.asistencia.fecha;

    if (!this.errorAlumnoId && !this.errorFecha) {
      // Validar que el alumno seleccionado esté en la lista de estudiantes
      const alumnoExistente = this.estudiantes.find(alumno => alumno.id === this.asistencia.alumnoId);

      if (alumnoExistente) {
        this.asistencias.push({ ...this.asistencia });
        this.guardarAsistencias();
        this.asistencia = { alumnoId: '', fecha: '', presente: false };
      } else {
        alert('Alumno no encontrado.');
      }
    }
  }

  calcularDiasPresente(alumnoId: string | undefined): number {
    if (!alumnoId) return 0; // Retorna 0 si el ID es inválido
    return this.asistencias.filter((a) => a.alumnoId === alumnoId && a.presente).length;
  }
  

  calcularDiasTotal(alumnoId: string): number {
    return this.asistencias.filter((a) => a.alumnoId === alumnoId).length;
  }

  calcularDiasFalta(alumnoId: string | undefined): number {
    if (!alumnoId) return 0; // Si el ID es undefined o vacío, devuelve 0
    const totalDias = this.asistencias.filter((a) => a.alumnoId === alumnoId).length;
    const diasPresente = this.asistencias.filter((a) => a.alumnoId === alumnoId && a.presente).length;
    return totalDias - diasPresente;
  }
  

  calcularPorcentajeAsistencia(alumnoId: string | undefined): number {
    if (!alumnoId) return 0; // Si alumnoId es undefined o vacío, devuelve 0
    const totalDias = this.asistencias.filter((a) => a.alumnoId === alumnoId).length;
    const diasPresente = this.asistencias.filter((a) => a.alumnoId === alumnoId && a.presente).length;
    return totalDias ? (diasPresente / totalDias) * 100 : 0;
  }
}