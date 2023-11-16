import { Component, OnInit, inject } from '@angular/core';
import { DocenteService } from '../service/service.ingresos/docente.service';
import { clases } from '../models/clases.model';
import { ClasesService } from '../service/clases.service';
import { UtilsServiceService } from '../service/utils.service.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-docenteclases',
  templateUrl: './docenteclases.page.html',
  styleUrls: ['./docenteclases.page.scss'],
})
export class DocenteclasesPage implements OnInit {
  ListaClases = [];
  clasesServ = inject(ClasesService);
  utilServ = inject(UtilsServiceService);

  user() {
    return this.utilServ.GetLocaStorage("user");
  }


  async getClases() {
    const loadding = await this.utilServ.loading();
    await loadding.present();
    const path = `clases/profesor/${this.user().Uid}`
    this.clasesServ.getAllClases(path).then(res => {
      res.subscribe( claseslista => {
        this.ListaClases = claseslista.map(claseref => {
          
          let clase = claseref.payload.doc.data();
          clase['uid'] = claseref.payload.doc.id;
          let estado = this.clasesServ.validcodeclase(clase as clases)
          if(estado){
          clase["estado"] = false;
          }else{
          clase["estado"] = true;
          }
          return clase;
        })
        loadding.dismiss();
        console.log(this.ListaClases);
      })
    })
  }

  async ngOnInit() {
    this.getClases()
  }


}
