import { Injectable, inject } from '@angular/core';
import { clases } from '../models/clases.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor() { }
  firestore = inject(AngularFirestore);

  public Clases: clases[] =
    [
      {
        id: '2',
        asignatura: 'pgy',
        seccion: '002v',
        profesor:
        {
          Uid: 'fZfJZg1O95NquWsQ1fPb8fIjcRf2',
          nombre: 'Saul Cuevas',
          email: 'S.Cuevas@profesor.duoc.cl',
          tipo: 'profesor'
        },
        nombre: 'Aplicaciones moviles',

        alumnos: [{
          Uid: 'Mq0RhInFGYa1oSc4mAKf4RL9Yz52',
          nombre: 'Willians Felipe',
          email: 'wi.briones@duocuc.cl',
          tipo: 'estudiante'
        },
        {
          Uid: 'Yrm3Efm1fog8WBFhz6Mv9cPZQfg1',
          nombre: 'Antonio Salazar',
          email: 'a.sallazar@duocuc.cl',
          tipo: 'estudiante'
        },
        {
          Uid: 'C95tKuUqEpfqJYkNplm6lxaPZvv1',
          nombre: 'Martin Gomez',
          email: 'm.gomez@duocuc.cl',
          tipo: 'estudiante'
        }],
        horario: [{ dia: 'Lunes', horaInicio: '19:00:00', horaTermino: '19:59:00'} ,
                  {dia: 'Martes', horaInicio: '19:00:00', horaTermino: '19:59:00'},
                  {dia: 'Jueves', horaInicio: '12:00:00', horaTermino: '23:00:00'}
                ]
      }
    ]
  setclases(){
    console.log("hola");
    this.Clases.forEach(clase => {
      let path = "clases/"+clase.asignatura+clase.seccion;
      return setDoc(doc(getFirestore(),path),clase);
    });
  }

}
