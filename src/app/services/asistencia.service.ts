// src/app/services/asistencia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private apiUrl = 'https://run.mocky.io/v3/b340e83c-f6cc-4f48-86e2-fb58e2b53d3d';
//api creada manualmente en mocky
  constructor(private http: HttpClient) {}

  getEstudiantes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
