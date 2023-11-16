import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner  } from '@capacitor-community/barcode-scanner';
import { UtilsServiceService } from '../service/utils.service.service';
import { DocenteService } from '../service/service.ingresos/docente.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  utilserv = inject(UtilsServiceService);
  docenteserv = inject(DocenteService)
  loginserv = inject(LoginService);
  constructor(
    private navctrl: NavController,
    private alertController: AlertController
    ) { }


  @ViewChild('exitboton', { read: ElementRef }) exitboton: ElementRef;
  @ViewChild('borrarElementos', { read: ElementRef }) borrarElementos: ElementRef;
  nombre: string = "";
  fecha: Date = new Date();
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
    this.loginserv.singOut();
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

  clases(){
    this.docenteserv.setclases()
  }
  asistencia(){
    this.docenteserv.setclasesalumnos();
  }
  ngOnInit() {
    let datos = this.utilserv.GetLocaStorage('user')
    this.nombre = datos.nombre
    console.log(this.fecha.getDay())
  }

}
