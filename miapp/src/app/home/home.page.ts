import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ElementRef, ViewChild } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service'
import { User } from '../models/User.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  @ViewChild('MyRef') element: ElementRef;

  private animation: Animation;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private navctrl: NavController,
    private animationCtrl: AnimationController
  ) { }
  fireserv = inject(LoginService);

  submit(){
    console.log(this.form.value);
    this.fireserv.SingIn(this.form.value as User).then(res =>{
      console.log(res);
    })
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
}
