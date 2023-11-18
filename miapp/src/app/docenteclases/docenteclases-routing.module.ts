import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteclasesPage } from './docenteclases.page';

const routes: Routes = [
  {
    path: '',
    component: DocenteclasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteclasesPageRoutingModule {}
