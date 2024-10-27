// src/app/alumnos/alumnos.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { AlumnosPage } from './alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule // Agrega IonicModule aquí
  ],
  declarations: [AlumnosPage]
})
export class AlumnosPageModule {}
