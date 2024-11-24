import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service'; // Importa el nuevo servicio

@Component({
  selector: 'app-user-email',
  templateUrl: './user-email.component.html',
  styleUrls: ['./user-email.component.scss'],
})
export class UserEmailComponent implements OnInit {
  userEmail: string | null = '';
  emailPart: string | null = ''; 

  constructor(
    private authService: AuthService,
    private userDataService: UserDataService // Inyecta el servicio UserDataService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserEmail().subscribe(email => {
      this.userEmail = email;
      this.emailPart = email ? email.split('@')[0].slice(0, 20) : null;
      
      // Guarda el username en UserDataService para compartirlo
      if (this.emailPart) {
        this.userDataService.setUsername(this.emailPart);
      }
    });
  }
}
