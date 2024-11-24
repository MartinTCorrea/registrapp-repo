import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss'],
})
export class PrincipalPage implements AfterViewInit {
  @ViewChild('fabButton', { read: ElementRef }) fabButton!: ElementRef;

  selectedDay: string;
  horarios: any[] = [
    {
      dia: 'Lunes',
      clases: [
        { hora: '08:00 - 09:00', nombre: 'Matemáticas', descripcion: 'Aula 101' },
        { hora: '09:00 - 10:00', nombre: 'Historia', descripcion: 'Aula 102' },
        { hora: '10:00 - 11:00', nombre: 'Biología', descripcion: 'Aula 103' },
        { hora: '11:00 - 12:00', nombre: 'Química', descripcion: 'Aula 104' },
      ],
    },
    {
      dia: 'Martes',
      clases: [
        { hora: '08:00 - 09:00', nombre: 'Física', descripcion: 'Aula 103' },
        { hora: '09:00 - 10:00', nombre: 'Inglés', descripcion: 'Aula 105' },
        { hora: '10:00 - 11:00', nombre: 'Literatura', descripcion: 'Aula 106' },
        { hora: '11:00 - 12:00', nombre: 'Arte', descripcion: 'Aula 107' },
      ],
    },
    {
      dia: 'Miércoles',
      clases: [
        { hora: '08:00 - 09:00', nombre: 'Geografía', descripcion: 'Aula 108' },
        { hora: '09:00 - 10:00', nombre: 'Matemáticas', descripcion: 'Aula 101' },
        { hora: '10:00 - 11:00', nombre: 'Historia', descripcion: 'Aula 102' },
        { hora: '11:00 - 12:00', nombre: 'Deportes', descripcion: 'Gimnasio' },
      ],
    },
    {
      dia: 'Jueves',
      clases: [
        { hora: '08:00 - 09:00', nombre: 'Física', descripcion: 'Aula 103' },
        { hora: '09:00 - 10:00', nombre: 'Química', descripcion: 'Aula 104' },
        { hora: '10:00 - 11:00', nombre: 'Inglés', descripcion: 'Aula 105' },
        { hora: '11:00 - 12:00', nombre: 'Literatura', descripcion: 'Aula 106' },
      ],
    },
    {
      dia: 'Viernes',
      clases: [
        { hora: '08:00 - 09:00', nombre: 'Biología', descripcion: 'Aula 103' },
        { hora: '09:00 - 10:00', nombre: 'Geografía', descripcion: 'Aula 108' },
        { hora: '10:00 - 11:00', nombre: 'Arte', descripcion: 'Aula 107' },
        { hora: '11:00 - 12:00', nombre: 'Deportes', descripcion: 'Gimnasio' },
      ],
    },
  ];

  constructor(
    private animationCtrl: AnimationController,
    private menuCtrl: MenuController,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.selectedDay = this.getDiaActual();
  }

  ngAfterViewInit() {
    this.startBlinking();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'secondMenu');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'secondMenu');
  }

  
  animateAndNavigate() {
    const button = this.fabButton.nativeElement;


    const expandAnimation = this.animationCtrl.create()
      .addElement(button)
      .duration(500)
      .easing('ease-in-out')
      .beforeStyles({
        'z-index': '9999',
        'transform-origin': 'center',
        'position': 'fixed',
        'top': `${button.getBoundingClientRect().top}px`,
        'left': `${button.getBoundingClientRect().left}px`,
      })
      .fromTo('transform', 'scale(1)', 'scale(100)'); 

    
    const shrinkAnimation = this.animationCtrl.create()
      .addElement(button)
      .duration(10)
      .easing('linear')
      .fromTo('transform', 'scale(100)', 'scale(1)');  

    expandAnimation.play().then(() => {
      shrinkAnimation.play().then(() => {
        this.router.navigate(['/camera']);
      });
    });
  }


  startBlinking() {
    const element = document.querySelector('.card-custom');
    if (element) {
      const animation = this.animationCtrl.create()
        .addElement(element)
        .duration(2000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, opacity: '1' },
          { offset: 0.05, opacity: '0.95' },
          { offset: 0.1, opacity: '0.9' },
          { offset: 0.15, opacity: '0.85' },
          { offset: 0.2, opacity: '0.8' },
          { offset: 0.25, opacity: '0.75' },
          { offset: 0.3, opacity: '0.7' },
          { offset: 0.35, opacity: '0.65' },
          { offset: 0.4, opacity: '0.6' },
          { offset: 0.45, opacity: '0.55' },
          { offset: 0.5, opacity: '0.5' },
          { offset: 0.55, opacity: '0.55' },
          { offset: 0.6, opacity: '0.6' },
          { offset: 0.65, opacity: '0.65' },
          { offset: 0.7, opacity: '0.7' },
          { offset: 0.75, opacity: '0.75' },
          { offset: 0.8, opacity: '0.8' },
          { offset: 0.85, opacity: '0.85' },
          { offset: 0.9, opacity: '0.9' },
          { offset: 0.95, opacity: '0.95' },
          { offset: 1, opacity: '1' },
        ]);

      animation.play();
    } else {
      console.warn('Fallo animacion');
    }
  }

  getClasesPorDia(dia: string) {
    const horario = this.horarios.find(h => h.dia === dia);
    return horario ? horario.clases : [];
  }

  getDiaActual(): string {
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const fechaActual = new Date();
    const diaSemana = fechaActual.getDay();
    const diaEnEspañol = diasSemana[(diaSemana + 6) % 7];
    return diaEnEspañol;
  }

  goToAsistencias() {
    this.navCtrl.navigateForward('/asistencias'); // Navegar a la página de asistencias
  }
}