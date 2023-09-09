import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
  
@Component({
  selector: 'app-rest-contrasena',
  templateUrl: './rest-contrasena.page.html',
  styleUrls: ['./rest-contrasena.page.scss'],
})
export class RestContrasenaPage implements OnInit {

  constructor(private navctrl: NavController) { }

  inicioSesion(){
    this.navctrl.navigateRoot("home")
  }

  ngOnInit() {
  }

}
