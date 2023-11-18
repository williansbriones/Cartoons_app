import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [PrincipalPage]
})
export class PrincipalPageModule {}
