import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
  ngOnInit() {
    document.body.classList.toggle('dark', true); // Activa siempre el modo oscuro
  }
}
