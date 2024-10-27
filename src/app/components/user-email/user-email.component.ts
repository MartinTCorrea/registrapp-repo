import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-email',
  templateUrl: './user-email.component.html',
  styleUrls: ['./user-email.component.scss'],
})
export class UserEmailComponent implements OnInit {
  userEmail: string | null = '';
  emailPart: string | null = ''; // Variable para almacenar la parte deseada del correo

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUserEmail().subscribe(email => {
      this.userEmail = email;
      this.emailPart = email ? email.split('@')[0].slice(0, 10) : null; // Obtiene las primeras 3 letras
    });
  }
}

