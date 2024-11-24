// camera.page.ts
import { Component } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';
import { AuthService } from '../services/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  constructor(
    private asistenciaService: AsistenciaService,
    private authService: AuthService
  ) {}


}
