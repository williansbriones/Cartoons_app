import { Injectable, inject } from '@angular/core';
import { clases } from '../../models/clases.model';
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
        id: '3',
        asignatura: 'pgh',
        seccion: '001v',
        profesor:
        {
          Uid: 'fZfJZg1O95NquWsQ1fPb8fIjcRf2',
          nombre: 'Saul Cuevas',
          email: 'S.Cuevas@profesor.duoc.cl',
          tipo: 'profesor'
        },
        nombre: 'Arquitectura',

        alumnos: [{
          Uid: 'Mq0RhInFGYa1oSc4mAKf4RL9Yz52', //listo
          nombre: 'Willians Felipe',
          email: 'wi.briones@duocuc.cl',
          tipo: 'estudiante'
        },
        {
          Uid: 'Yrm3Efm1fog8WBFhz6Mv9cPZQfg1',//listo
          nombre: 'Antonio Salazar',
          email: 'a.sallazar@duocuc.cl',
          tipo: 'estudiante'
        },
        {
          Uid: 'C95tKuUqEpfqJYkNplm6lxaPZvv1',//listo
          nombre: 'Martin Gomez',
          email: 'm.gomez@duocuc.cl',
          tipo: 'estudiante'
        }],
        horario: [
        { dia: 'Viernes', horaInicio: '00:00:00', horaTermino: '23:59:00' },
        { dia: 'Jueves', horaInicio: '01:00:00', horaTermino: '23:59:00' }
        ]
      }
    ]

  asignaturas = [
    {
      asignaturas: "pgt",
      seccion: "003v"
    },
    {
      asignaturas: "pgy",
      seccion: "002v"
    },
    {
      asignaturas: "pgh",
      seccion: "001v"
    },
  ]

  setclases() {
    console.log("hola");
    this.Clases.forEach(clase => {
      let path = "clases/profesor/" + "fZfJZg1O95NquWsQ1fPb8fIjcRf2/" + clase.asignatura + clase.seccion;
      console.log(path)
      return setDoc(doc(getFirestore(), path), clase);
    });
  }
  setclasesalumnos() {
    let path = "clases/alumno/C95tKuUqEpfqJYkNplm6lxaPZvv1/asignaturas"
    console.log(path)
    return setDoc(doc(getFirestore(), path), {...this.asignaturas});
  }

}
