import { Injectable } from '@angular/core';
import { clases } from '../models/clases.model';
@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor() { }

  public Clases:clases[] = 
  [
    {
      id: 1,
      asignatura : 'ydpy',
      seccion : '005v',
      id_profesor : 1,
      profesor: "Sergio M."
    },
    {
      id: 2,
      asignatura : 'ydpy',
      seccion : '006v',
      id_profesor : 1,
      profesor: "Sergio M."
    },
    {
      id: 3,
      asignatura : 'ydpy',
      seccion : '007v',
      id_profesor : 1,
      profesor: "Sergio M."
    },
    {
      id: 4,
      asignatura : 'ydpy',
      seccion : '008v',
      id_profesor : 1,
      profesor: "Sergio M."
    },
  ]

  getclase(id:number){
    return{...this.Clases.find(Clases => {
       return Clases.id === id;
    })}
  }

  getallclases(){
    return [...this.Clases]
  }

}
