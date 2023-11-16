import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ElementRef, ViewChild } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service'
import { User } from '../models/User.model';
import { UtilsServiceService } from '../service/utils.service.service'
import { IngresoautoService } from '../service/service.ingresos/ingresoauto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  @ViewChild('MyRef') element: ElementRef;
  private animation: Animation;
  //==============formulario==============
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private navctrl: NavController,
    private animationCtrl: AnimationController) { }
  fireserv = inject(LoginService);
  utilserv = inject(UtilsServiceService);
  Loaduser = inject(IngresoautoService)

  //==============inicio sesion===========
  async submit() {
    if (this.form.valid) {

      const loading = await this.utilserv.loading();
      await loading.present();

      this.fireserv.SingIn(this.form.value as User).then(async res => {
        await this.getuser(res.user.uid);
        const datos = await this.utilserv.GetLocaStorage('user');

        this.fireserv.redireccion(datos as User);
      }).catch(error => {
        console.log(error);
        this.utilserv.presstoast({
          message: error.message,
          duration: 2000,
          color: 'dark',
          position: 'top',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  //============ingormacion del usuario==================
  async getuser(uid: string) {
    let path = "user/" + uid;
    await this.fireserv.getdocument(path).then(res => {
      this.utilserv.SaveLocalStorage('user', res);
    })
    this.form.reset();

  }


  //============animación==================
  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.element.nativeElement)
      .duration(3000)
      .keyframes([
        { offset: 0, opacity: '0.1' },
        { offset: 0.25, opacity: '0.4' },
        { offset: 0.5, opacity: '0.6' },
        { offset: 0.75, opacity: '0.8' },
        { offset: 1, opacity: '1' },
      ]);
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  stop() {
    this.animation.stop();
  }
  //==================navegacion==================
  RestCon() {
    this.navctrl.navigateRoot("rest-contrasena")
  }

  //==================Carcar usuarios==================  
  async cargarusuarios() {
    const loading = await this.utilserv.loading();
    await loading.present();
    this.Loaduser.RegistroUsuario().then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      loading.dismiss();
    })
  }

}

