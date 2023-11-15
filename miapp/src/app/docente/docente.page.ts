import { Component, OnInit, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UtilsServiceService } from '../service/utils.service.service';
import { LoginService } from '../service/login.service';



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

  utilserv = inject(UtilsServiceService);
  loginserv = inject(LoginService);
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
    this.loginserv.singOut();
  }

  ngOnInit(){
    let datos = this.utilserv.GetLocaStorage('user')
    this.nombre = datos.nombre;
  }

}