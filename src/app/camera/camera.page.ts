// camera.page.ts
import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';
import { AuthService } from '../services/auth.service';
import { lastValueFrom } from 'rxjs';
import { IonModal, ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  isScanning = false; // Variable para controlar la visibilidad

  constructor(
    private asistenciaService: AsistenciaService,
    private authService: AuthService,
    private modalController: ModalController,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  scanResult = '';

  async startScan() {
    this.isScanning = true; // Oculta los elementos al iniciar el escaneo

    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        LensFacing: LensFacing.Back,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResult = data?.barcode?.displayValue;
    }

    this.isScanning = false; // Vuelve a mostrar los elementos tras cerrar el escáner
  }
}

