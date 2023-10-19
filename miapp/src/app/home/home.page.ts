import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ElementRef, ViewChild } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard, IonCardContent } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  @ViewChild('MyRef') element: ElementRef;

  private animation: Animation;
  
  email: string = "";
  contrasena: string = "";
  maxval: number = 0;
  constructor(
    private navctrl: NavController,
    private animationCtrl: AnimationController
    ) {}

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

  RestCon(){
    this.navctrl.navigateRoot("rest-contrasena")
  }

  getconsultas(){
    let errorContraseña = document.getElementsByClassName("contraseña-incorrecta") as HTMLCollectionOf<HTMLElement>;
    var i = 0;
    if(this.email.includes("@duocuc")){
      if(this.contrasena.length==4){
      this.navctrl.navigateRoot("principal")
      }
    }else if(this.email.includes("@profesor")){
      this.navctrl.navigateRoot("docente")
    }else{
      errorContraseña[0].style.display = "block"
      console.log(this.email);
      console.log(this.contrasena);
      this.play()
    }
    return
  }
 

}
