import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  myAngularxQrCode: string = "";
  nombre: string = "Alexander";
  asignatura: string = "ASY4131"
  seccion: string = "004-v";

  constructor(
    private navctrl: NavController,
    private alertController: AlertController
  ) {
  }

  async VerClases(){
    this.navctrl.navigateRoot("docente/docenteclases")
  }

  

  async alertCerraSesion() {
    const alert = await this.alertController.create({
      header: '¿Seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

          handler: () => {

          },
        },
        {
          text: 'cerrra sesión',
          role: 'confirm',
          handler: () => {
            this.CerrarSesion()
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }
  CerrarSesion() {
    this.navctrl.navigateRoot("home")
  }

  ngOnInit(){
    
  }

}