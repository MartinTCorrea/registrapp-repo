import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  
  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState;
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }

  async login(email: string, password: string) {
    // Validaciones previas a la autenticación
    if (!email) {
      this.showToast('Por favor, ingresa tu correo electrónico.', 'warning');
      return;
    }

    if (!password) {
      this.showToast('Por favor, ingresa tu contraseña.', 'warning');
      return;
    }

    // Validar formato del correo electrónico usando una expresión regular
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      this.showToast('Formato de correo electrónico inválido.', 'warning');
      return;
    }

    try {
      // Intentar iniciar sesión con Firebase
      await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.showToast('¡Logueado exitosamente!', 'success'); // Mostrar mensaje de éxito
      this.router.navigate(['/principal']); // Navegar a la página principal en caso de éxito
    } catch (error: any) {
      // Manejar errores específicos de Firebase Authentication
      let errorMessage = 'Error en el inicio de sesión.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No se encontró una cuenta con este correo.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'La contraseña es incorrecta.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos fallidos. Inténtalo más tarde.';
      }

      this.showToast(errorMessage, 'danger'); // Mostrar mensaje de error específico
    }
  }

  async register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.afAuth.signOut();
  }

  getUser() {
    return this.afAuth.user;
  }

  getCurrentUserEmail() {
    return this.afAuth.authState.pipe(
      map(user => user ? user.email : null)
    );
  }
}