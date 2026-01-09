import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiService {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  async alertaInformativa(message: string) {

    const alert = await this.alertCtrl.create({
      message,
      buttons: ['Ok'],
    });

    await alert.present();
  }


  async presentToast(position: 'top' | 'middle' | 'bottom' = 'top', message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position,
    });

    await toast.present();
  }

}
