import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasesService } from '../service/clases.service';
import { UtilsServiceService } from '../service/utils.service.service';
import { clases } from '../models/clases.model';
import { asistencia } from '../models/asistencia.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-class',
  templateUrl: './detail-class.page.html',
  styleUrls: ['./detail-class.page.scss'],
})
export class DetailClassPage implements OnInit, OnDestroy {
  asistenciaVacia: asistencia
  claseVacia: clases;
  subscription: Subscription;
  asistencia: asistencia;
  asistencia_active = [];
  clase: clases ;
  myAngularxQrCode: string = "a";
  asignatura: string = ""
  seccion: string = "";
  activatedRoute = inject(ActivatedRoute);
  clasesServ = inject(ClasesService);
  utilServ = inject(UtilsServiceService);
  user() {
    return this.utilServ.GetLocaStorage("user");
  }

  back(){
    this.ngOnDestroy();
    this.utilServ.routerlink("/docente/docenteclases")
  }

  ionViewWillEnter(){
    if(this.asistencia_active === null){
      this.ngOnInit()
      console.log("ejecuta")
    }
  }


  async ngOnInit() {
    const loading = await this.utilServ.loading();
    await loading.present();
    
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      const ClaseId = paramMap.get("idClass");

      let path = `clases/profesor/${this.user().Uid}/${ClaseId}`
      this.clase = await this.clasesServ.getclase(path) as clases

      let preCodeAsist = `${this.clase.asignatura}-${this.clase.seccion}`;
      this.asistencia = this.clasesServ.createAsis(this.clase, preCodeAsist);
      this.asignatura = this.clase.asignatura;
      this.seccion = this.clase.seccion;
      this.myAngularxQrCode = this.asistencia.codigo;
      this.clasesServ.setAsistencia(this.asistencia);
      this.subscription = this.clasesServ.getasistencia(`asistencia/${this.asistencia.codigo}`).subscribe(asistenciaref =>{
        let asistencia = asistenciaref as asistencia;
        this.asistencia_active = asistencia.alumnos.map(alumnoref =>{
          let alumno = alumnoref;
          alumno["estadoString"] = alumno.Estado? "Presente" : "Ausente"
          return alumno;
        });
        
      })
      loading.dismiss();
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.myAngularxQrCode = "";
    this.asistencia = this.asistenciaVacia;
    this.asistencia_active = []
    this.clase = this.claseVacia;
    this.asignatura = "";
    this.seccion = "";
  }

}
