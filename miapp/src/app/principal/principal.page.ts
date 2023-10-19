import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(
    private barcodeScaner: BarcodeScanner,
    private navctrl: NavController,
    private alertController: AlertController
    ) { }

  nombre: string = "PepeGrillo";
  codigo: any;
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

  scan(){
    this.barcodeScaner.scan().then(barcodeData =>{
      this.codigo = barcodeData.text;
      console.log('barcode data:'+ this.codigo);
    }).catch(err => {
      console.log('Error: '+ err);
    })
  }


  ngOnInit() {
  }

}
