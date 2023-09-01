import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string = "";
  contrasena: string = "";

  constructor() {}

  getconsultas(){
    let errorContraseña = document.getElementsByClassName("contraseña-incorrecta") as HTMLCollectionOf<HTMLElement>;
    var i = 0;
    errorContraseña[0].style.display = "block"
    console.log(this.email);
    console.log(this.contrasena);
    return
  }

}
