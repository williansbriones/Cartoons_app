import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  auth = inject(AngularFireAuth)

  //==============autenticación =======================

  //=============== inicio sesion ===================
  SingIn(User: User){
    console.log(User.email+ " " + User.password);
    return signInWithEmailAndPassword(getAuth(),User.email, User.password);
  }
}
