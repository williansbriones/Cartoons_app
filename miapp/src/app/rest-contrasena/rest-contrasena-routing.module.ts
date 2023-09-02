import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestContrasenaPage } from './rest-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: RestContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestContrasenaPageRoutingModule {}
