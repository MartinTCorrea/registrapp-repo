import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoPageRoutingModule } from './curso-routing.module';

import { CursoPage } from './curso.page';
import { AlumnoComponent } from '../components/alumno/alumno.component';
import { ListaComponent } from '../components/lista/lista.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoPageRoutingModule
  ],
  declarations: [CursoPage, AlumnoComponent, ListaComponent]
})
export class CursoPageModule {}
