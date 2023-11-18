import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteclasesPageRoutingModule } from './docenteclases-routing.module';

import { DocenteclasesPage } from './docenteclases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteclasesPageRoutingModule
  ],
  declarations: [DocenteclasesPage]
})
export class DocenteclasesPageModule {}
