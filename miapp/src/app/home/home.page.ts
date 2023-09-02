import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  email: string = "";
  contrasena: string = "";
  maxval: number = 0;
  constructor(private navctrl: NavController) {}

  


  getconsultas(){
    let errorContraseña = document.getElementsByClassName("contraseña-incorrecta") as HTMLCollectionOf<HTMLElement>;
    var i = 0;
    if(this.email.length>3 && this.email.includes("@")){
      if(this.contrasena.length==4){
      this.navctrl.navigateRoot("principal")
      }
    }
    errorContraseña[0].style.display = "block"
    console.log(this.email);
    console.log(this.contrasena);
    return
  }
 

}
