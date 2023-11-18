import { Component, OnInit, ViewChild, ElementRef, inject, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { UtilsServiceService } from '../service/utils.service.service';
import { DocenteService } from '../service/service.ingresos/docente.service';
import { LoginService } from '../service/login.service';
import { ClasesService } from '../service/clases.service';
import { asistencia } from '../models/asistencia.model';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit, OnDestroy {

  //==========injects y constructors ==========
  utilserv = inject(UtilsServiceService);
  docenteserv = inject(DocenteService)
  loginserv = inject(LoginService);
  clasesserv = inject(ClasesService);
  constructor(
    private alertController: AlertController
  ) { }


  @ViewChild('exitboton', { read: ElementRef }) exitboton: ElementRef;
  @ViewChild('borrarElementos', { read: ElementRef }) borrarElementos: ElementRef;
  nombre: string = "";

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
  //Funciones par el scaneo de la camara
  //Mensaje de asistencia
  async MSGRegistroAsistencia(codigo: asistencia) {
    const alert = await this.alertController.create({
      header: 'Registro asistencia',
      subHeader: `Asignatura: ${codigo.codigo}`,
      message: `regitro: exitoso`,
      buttons: [
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {

          },
        }],
    });

    await alert.present();
  }

  async errorregister() {
    const alert = await this.alertController.create({
      header: 'Usted no, pertenece a la asignatura',
      buttons: [
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {

          },
        }],
    });

    await alert.present();
  }
  //Funcion que abre la camara para scannear
  async startScan() {
    const loadding = await this.utilserv.loading();
    try {
      await BarcodeScanner.checkPermission({ force: true });

      await BarcodeScanner.hideBackground();

      this.borrarElementos.nativeElement.style.display = "none";

      this.exitboton.nativeElement.style.display = "block"
      document.querySelector('html').classList.add('scanner-active');

      //await this.clasesserv.registrarAsistencia("pgh-001v-4-10");
      const result = await BarcodeScanner.startScan();
      
      
      if (result.hasContent) {
        await loadding.present();
        console.log(result.content)
        let res = await this.clasesserv.registrarAsistencia(result.content);
        console.log(res)
        if (res === null) {
          await loadding.dismiss()
          await this.errorregister();
          this.borrarElementos.nativeElement.style.display = "block";
          this.exitboton.nativeElement.style.display = "none"
          await BarcodeScanner.showBackground();
          await BarcodeScanner.stopScan();
          document.querySelector('html').classList.remove('scanner-active');
        } else {
          await loadding.dismiss()
          this.MSGRegistroAsistencia(res as asistencia);
          this.borrarElementos.nativeElement.style.display = "block";
          this.exitboton.nativeElement.style.display = "none"
          await BarcodeScanner.showBackground();
          await BarcodeScanner.stopScan();
          document.querySelector('html').classList.remove('scanner-active');
        }
      }
    } catch (error) {
      await loadding.dismiss();
      await this.errorregister();
      this.borrarElementos.nativeElement.style.display = "block";
      this.exitboton.nativeElement.style.display = "none"
      await BarcodeScanner.showBackground();
      await BarcodeScanner.stopScan();
      document.querySelector('html').classList.remove('scanner-active');
    }finally{
      await loadding.dismiss()
    }
  };

  async salirCamara() {
    this.borrarElementos.nativeElement.style.display = "block";
    this.exitboton.nativeElement.style.display = "none"
    await BarcodeScanner.showBackground();
    await BarcodeScanner.stopScan();
    document.querySelector('html').classList.remove('scanner-active');
  }

  clases() {
    this.docenteserv.setclases()
  }
  asistencia() {
    this.docenteserv.setclasesalumnos();
  }
  ngOnInit() {
    let datos = this.utilserv.GetLocalStorage('user')
    this.nombre = datos.nombre
    console.log(datos.nombre)
  }

  ionViewDidEnter(){
    this.ngOnInit();
  }


  ngOnDestroy(){
    this.nombre = "";
  }
}
