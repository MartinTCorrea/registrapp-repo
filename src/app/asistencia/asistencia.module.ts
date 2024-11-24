import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AsistenciaPageRoutingModule } from './asistencia-routing.module';
import { AsistenciaPage } from './asistencia.page';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de que esto esté importado

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaPageRoutingModule,
    HttpClientModule,  // Asegúrate de incluir HttpClientModule
  ],
  declarations: [AsistenciaPage]
})
export class AsistenciaPageModule {}
