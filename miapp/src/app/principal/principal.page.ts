import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner, SupportedFormat  } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(
    private navctrl: NavController,
    private alertController: AlertController
    ) { }

  nombre: string = "PepeGrillo";
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
  
  CerrarSesion(){
    this.navctrl.navigateRoot("home")
  }


 //Funciones par el scaneo de la camara
 //Mensaje de asistencia
  async MSGRegistroAsistencia( codigo: string) {
    const alert = await this.alertController.create({
      header: 'Registro asistencia',
      subHeader: 'Asignatura: ASY4131',
      message: 'Codigo: '+ codigo,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          
        },
      },
      {
        text: 'Registrar',
        role: 'confirm',
        handler: () => {
          
        },
      }],
    });

    await alert.present();
  }
  //Funcion que abre la camara para scannear
  async startScan() {
    await BarcodeScanner.checkPermission({ force: true });
  
    await BarcodeScanner.hideBackground();
    document.querySelector('body')?.classList.add('barcode-scanner-active');

    const result = await BarcodeScanner.startScan();
  
    if (result.hasContent) {
      this.MSGRegistroAsistencia(result.content)
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    }
  };

  ngOnInit() {
  }

}
