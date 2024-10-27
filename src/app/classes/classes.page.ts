import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectedDay: string = 'lunes';
horarios: any[] = [
  {
    dia: 'lunes',
    clases: [
      { hora: '08:00 - 09:00', nombre: 'Matemáticas', descripcion: 'Aula 101' },
      { hora: '09:00 - 10:00', nombre: 'Historia', descripcion: 'Aula 102' },
      { hora: '10:00 - 11:00', nombre: 'Biología', descripcion: 'Aula 103' },
      { hora: '11:00 - 12:00', nombre: 'Química', descripcion: 'Aula 104' },
    ],
  },
  {
    dia: 'martes',
    clases: [
      { hora: '08:00 - 09:00', nombre: 'Física', descripcion: 'Aula 103' },
      { hora: '09:00 - 10:00', nombre: 'Inglés', descripcion: 'Aula 105' },
      { hora: '10:00 - 11:00', nombre: 'Literatura', descripcion: 'Aula 106' },
      { hora: '11:00 - 12:00', nombre: 'Arte', descripcion: 'Aula 107' },
    ],
  },
  {
    dia: 'miercoles',
    clases: [
      { hora: '08:00 - 09:00', nombre: 'Geografía', descripcion: 'Aula 108' },
      { hora: '09:00 - 10:00', nombre: 'Matemáticas', descripcion: 'Aula 101' },
      { hora: '10:00 - 11:00', nombre: 'Historia', descripcion: 'Aula 102' },
      { hora: '11:00 - 12:00', nombre: 'Deportes', descripcion: 'Gimnasio' },
    ],
  },
  {
    dia: 'jueves',
    clases: [
      { hora: '08:00 - 09:00', nombre: 'Física', descripcion: 'Aula 103' },
      { hora: '09:00 - 10:00', nombre: 'Química', descripcion: 'Aula 104' },
      { hora: '10:00 - 11:00', nombre: 'Inglés', descripcion: 'Aula 105' },
      { hora: '11:00 - 12:00', nombre: 'Literatura', descripcion: 'Aula 106' },
    ],
  },
  {
    dia: 'viernes',
    clases: [
      { hora: '08:00 - 09:00', nombre: 'Biología', descripcion: 'Aula 103' },
      { hora: '09:00 - 10:00', nombre: 'Geografía', descripcion: 'Aula 108' },
      { hora: '10:00 - 11:00', nombre: 'Arte', descripcion: 'Aula 107' },
      { hora: '11:00 - 12:00', nombre: 'Deportes', descripcion: 'Gimnasio' },
    ],
  },
];

  getClasesPorDia(dia: string) {
    const horario = this.horarios.find(h => h.dia === dia);
    return horario ? horario.clases : [];
  }
}
