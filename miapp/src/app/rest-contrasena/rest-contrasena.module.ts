import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestContrasenaPageRoutingModule } from './rest-contrasena-routing.module';

import { RestContrasenaPage } from './rest-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestContrasenaPageRoutingModule
  ],
  declarations: [RestContrasenaPage]
})
export class RestContrasenaPageModule {}
