import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'rest-contrasena',
    loadChildren: () => import('./rest-contrasena/rest-contrasena.module').then( m => m.RestContrasenaPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'docente',
    children:[
      {
        path:"",
        loadChildren: () => import('./docente/docente.module').then( m => m.DocentePageModule)
      },
      {
        path: 'docenteclases',
        loadChildren: () => import('./docenteclases/docenteclases.module').then( m => m.DocenteclasesPageModule)
      },
      {
        path: ':idClass',
        loadChildren: () => import('./detail-class/detail-class.module').then( m => m.DetailClassPageModule)
      },

    ]
  },
  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
