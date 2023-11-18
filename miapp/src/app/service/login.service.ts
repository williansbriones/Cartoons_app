import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { User } from '../models/User.model';
import { getDoc, doc, getFirestore } from '@angular/fire/firestore'
import { UtilsServiceService } from './utils.service.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  auth = inject(AngularFireAuth)
  utilserv = inject(UtilsServiceService);
  //==============autenticación =======================

  //=============== inicio sesion ===================
  SingIn(User: User) {
    return signInWithEmailAndPassword(getAuth(), User.email, User.password);
  }
  //=============== inicio sesion ===================
  async getdocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  //=============== verificar usuario ===================
  redireccion(User: User) {

    if (User.tipo == 'profesor') {
      this.utilserv.routerlink('docente');
    } else if (User.tipo == 'estudiante') {
      this.utilserv.routerlink('principal');
    }


  }
  //===============varificar inicio de sesion===================
  getAuth() {
    return getAuth();
  }
  singOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilserv.routerlink('home');
  }
}