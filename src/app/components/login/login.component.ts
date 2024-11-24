import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = "";
  password: string = "";
  passwordVisible: boolean = false; // Nueva variable para controlar la visibilidad de la contraseña

  constructor(private authService: AuthService, private router: Router,private alertController: AlertController) {}

  ngOnInit() {}

  ngOnDestroy() {
    // Limpiar los campos de los inputs al salir de la página
    this.email = "";
    this.password = "";
  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
    } catch (error) {
      console.error("Error en el login", error);
    }
  }

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      await this.showAlert("Registro exitoso", "Te has registrado correctamente.");
    } catch (error) {
      console.error("Problemas al registrar el usuario", error);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(event: any) {
    this.passwordVisible = event.detail.checked;
  }
}