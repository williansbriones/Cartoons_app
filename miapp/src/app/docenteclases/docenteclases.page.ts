import { Component, OnInit } from '@angular/core';
import { clases } from './clases.model';
@Component({
  selector: 'app-docenteclases',
  templateUrl: './docenteclases.page.html',
  styleUrls: ['./docenteclases.page.scss'],
})
export class DocenteclasesPage implements OnInit {

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

  ngOnInit() {
    console.log(this.getclase(2))
  }

}
