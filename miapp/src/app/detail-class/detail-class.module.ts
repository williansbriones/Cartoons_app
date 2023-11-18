import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailClassPageRoutingModule } from './detail-class-routing.module';

import { DetailClassPage } from './detail-class.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailClassPageRoutingModule,
    QRCodeModule
  ],
  declarations: [DetailClassPage]
})
export class DetailClassPageModule {}
