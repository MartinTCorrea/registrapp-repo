import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  email:string = "";
  password:string ="";

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {}

  async login(){
    try{
      this.authService.login(this.email, this.password);
      alert("Logueado exitosamente!");
      this.router.navigate(['/principal']);

    }catch(error){
      console.error("Error en el login", error);
    }
  

  }
  async register(){
    try{
      this.authService.register(this.email, this.password);
      alert("Registrado exitosamente "+this.email)

    }catch(error){
      console.error("Problemas al registrar el usuario", error);
    }
  }

}
