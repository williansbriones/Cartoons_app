import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [NoAuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'rest-contrasena',
    loadChildren: () => import('./rest-contrasena/rest-contrasena.module').then( m => m.RestContrasenaPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'docente',
    children:[
      {
        path:"",
        loadChildren: () => import('./docente/docente.module').then( m => m.DocentePageModule), canActivate:[AuthGuard]
      },
      {
        path: 'docenteclases',
        loadChildren: () => import('./docenteclases/docenteclases.module').then( m => m.DocenteclasesPageModule), canActivate:[AuthGuard]
      },
      {
        path: ':idClass',
        loadChildren: () => import('./detail-class/detail-class.module').then( m => m.DetailClassPageModule), canActivate:[AuthGuard]
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
