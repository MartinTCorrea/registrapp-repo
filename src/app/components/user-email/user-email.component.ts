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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUserEmail().subscribe(email => {
      this.userEmail = email;
    });
  }
}

