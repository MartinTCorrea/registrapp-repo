import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('botonAnim', { read: ElementRef, static: false }) button!: ElementRef;
  
  passwordType: string = 'password';
  toggleChecked: boolean = false;

  constructor(private menuCtrl: MenuController,private animationCtrl: AnimationController, private router: Router) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'firstMenu');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'firstMenu');
  }

  togglePasswordVisibility(event: any) {
    this.toggleChecked = event.detail.checked;
    this.passwordType = this.toggleChecked ? 'text' : 'password';
  }

  animateAndNavigate(event: Event) {
    const button = event.target as HTMLElement;


    const animation = this.animationCtrl.create()
      .addElement(button)  
      .duration(500)   
      .easing('ease-in-out') 
      .fromTo('transform', 'scale(1)', 'scale(1.2)') 
      .fromTo('opacity', '1', '0.8');               

    animation.play().then(() => {
      this.router.navigate(['/principal']);  
    });
  }
}
