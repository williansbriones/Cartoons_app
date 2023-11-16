import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../../models/User.model';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { getFirestore, setDoc, doc } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class IngresoautoService {

firestore = inject(AngularFirestore);
//==========usuarios estaticos==========
  User: User[] =
    [
      {
        uid: '',
        nombre: 'Willians Felipe',
        email: 'wi.briones@duocuc.cl',
        password: '123456',
        tipo: 'estudiante',
        url: ''
      },
      {
        uid: '',
        nombre: 'Antonio Salazar',
        email: 'a.sallazar@duocuc.cl',
        password: '123456',
        tipo: 'estudiante',
        url: ''
      },
      {
        uid: '',
        nombre: 'Martin Gomez',
        email: 'm.gomez@duocuc.cl',
        password: '123456',
        tipo: 'estudiante',
        url: ''
      },
      {
        uid: '',
        nombre: 'Jose Pinto',
        email: 'j.pinto@profesor.duoc.cl',
        password: '123456',
        tipo: 'profesor',
        url: ''
      },
      {
        uid: '',
        nombre: 'Saul Cuevas',
        email: 'S.Cuevas@profesor.duoc.cl',
        password: '123456',
        tipo: 'profesor',
        url: ''
      },
    ]
//==========ingreso de nombre==========
  editname(displayName: string){
    return updateProfile(getAuth().currentUser,{displayName})  
  }
//==========registro usuarios==========
  async RegistroUsuario(){
    return this.User.forEach(usuarios => {
    createUserWithEmailAndPassword(getAuth(),usuarios.email,usuarios.password).then(async res =>{
      await this.editname(usuarios.nombre);
      usuarios.password = "";
      let datos = {
        Uid: res.user.uid,
        email: usuarios.email,
        nombre: usuarios.nombre,
        tipo: usuarios.tipo
      }
      await this.setdocument(datos, res.user.uid)
    })
   
    });
  }
  
//==========registar datos==========
setdocument(data: any, id: string){
  let path = 'user/'+id;
  return setDoc(doc(getFirestore(), path), data)
}
}
