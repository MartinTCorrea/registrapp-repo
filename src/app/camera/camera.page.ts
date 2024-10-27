import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType,CameraSource  } from '@capacitor/camera';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit{

  capturedImage: string | undefined;  

  constructor() {}

  async abrirCamara() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });

    this.capturedImage = image.webPath;

    console.log('Imagen capturada:', image); 
  }

  ngOnInit() {
    this.abrirCamara();
  }
}
