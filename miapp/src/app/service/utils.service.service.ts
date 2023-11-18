import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Url } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {

  loadingCtrl = inject(LoadingController);
  toasctCotrl = inject(ToastController);
  router = inject(Router);

  loading(){
    return this.loadingCtrl.create({spinner: 'bubbles'})
  }


  //==========toast==========
  async presstoast(Options: ToastOptions)
  {
    const toast = await this.toasctCotrl.create(Options);
    toast.present();
  }
  //==========navegar==========
  routerlink(url: string){
    this.router.navigateByUrl(url);
  }
  //==========funciones localstorage==========
  SaveLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }
  GetLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }
}
