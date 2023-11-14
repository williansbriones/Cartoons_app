import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../service/docente.service';
import { clases } from '../models/clases.model';

@Component({
  selector: 'app-docenteclases',
  templateUrl: './docenteclases.page.html',
  styleUrls: ['./docenteclases.page.scss'],
})
export class DocenteclasesPage implements OnInit {

  Clases!: clases[];

  constructor(
    private servClases: DocenteService,
  ) { }

  

  ngOnInit() {

    this.Clases = this.servClases.getallclases();

  }


}
