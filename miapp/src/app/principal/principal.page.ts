import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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


  @ViewChild('exitboton', { read: ElementRef }) exitboton: ElementRef;
  @ViewChild('borrarElementos', { read: ElementRef }) borrarElementos: ElementRef;
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

    this.borrarElementos.nativeElement.style.display = "none";
    this.exitboton.nativeElement.style.display = "block"
    
    const result = await BarcodeScanner.startScan();
    
    if(result.hasContent) {
      this.MSGRegistroAsistencia(result.content)
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
      }
  };

  salirCamara() {
    this.borrarElementos.nativeElement.style.display = "block";
    this.exitboton.nativeElement.style.display = "none"
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }


  ngOnInit() {
  }

}
