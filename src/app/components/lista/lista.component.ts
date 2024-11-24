import { Component, OnInit } from '@angular/core';
import { AlumnoService, Alumno } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent  implements OnInit {

  alumnos:Alumno[]=[]
  constructor(private alumnoService:AlumnoService) { }



  ngOnInit() {

    this.alumnoService.getAlumnos().subscribe(alumnos =>{
      this.alumnos = alumnos
    })
  }

}
