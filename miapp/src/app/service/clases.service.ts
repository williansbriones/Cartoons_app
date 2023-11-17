import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDoc, doc, getFirestore, setDoc, } from '@angular/fire/firestore'
import { UtilsServiceService } from './utils.service.service';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { asistencia } from '../models/asistencia.model';
import { clases } from '../models/clases.model';
import { alumnoAsist } from '../models/alumnoAsist.model';
import { horario } from '../models/horario.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  
  fecha: Date = new Date();
  auth = inject(AngularFireAuth)
  utilserv = inject(UtilsServiceService);
  firestore = inject(AngularFirestore)



  parcearHora(time: string) {
    const fechaActual = new Date();
    const [hora, minuto, segundo] = time.split(":");
    fechaActual.setHours(parseInt(hora, 10));
    fechaActual.setMinutes(parseInt(minuto, 10));
    fechaActual.setSeconds(parseInt(segundo, 10));
    return fechaActual;
  }

  obtenerNombreDia(numeroDia) {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return diasSemana[numeroDia];
  }

  obtenerNombreMes(numeroMes) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[numeroMes];
  }

  async getAllClases(path: string) {
    console.log(path);
    return this.firestore.collection(path).snapshotChanges()
  }

  async getclase(path: string) {

    return (await getDoc(doc(getFirestore(), path))).data();
  }

  validcodeclase(Clase: clases) {
    let DateCodClass = "";
    const fechaActual = new Date();
    const nombreDia = this.obtenerNombreDia(fechaActual.getDay());
    Clase.horario.forEach(horarioref => {
      let horario = horarioref as horario
      let horainicio = this.parcearHora(horario.horaInicio);
      let horatermino = this.parcearHora(horario.horaTermino);
      if (horario.dia == nombreDia) {
        if (horainicio <= fechaActual && horatermino >= fechaActual) {
          console.log("hay clases hoy");
          DateCodClass = fechaActual.getDay() + "-" + fechaActual.getMonth();

        }
      }
    });
    if (DateCodClass) {
      return DateCodClass;
    } else {
      return null;
    }
  }

  createAsis(clase: clases, preCodeClase: string) {
    let asistencia: asistencia;
    let Alumnos: alumnoAsist[];
    const fechaActual = new Date();
    const nombreDia = this.obtenerNombreDia(fechaActual.getDay());
    const nombreMes = this.obtenerNombreMes(fechaActual.getMonth());
    let DateCode = this.validcodeclase(clase);
    if(DateCode === null){
      this.utilserv.routerlink("docente/docenteclases")
      return null;

    }
    Alumnos = clase.alumnos;
    Alumnos.forEach(alumno => {
      alumno.Estado = false;
    });
    console.log(clase);
    asistencia =
    {
      codigo: `${preCodeClase}-${DateCode}`,
      dia: nombreDia,
      mes: nombreMes,
      alumnos: Alumnos
    }
    console.log("hola");
    return (asistencia)
  }

  async validarAsistencia(path:string){
    return (await getDoc(doc(getFirestore(), path))).data()
  }

  async setAsistencia(asistencia: asistencia){
    let path = `asistencia/${asistencia.codigo}`;
    console.log(path);
    if(await this.validarAsistencia(path)){
      console.log("existe");
      return await this.validarAsistencia(path);
    }else{
      console.log("no exite")
      return setDoc(doc(getFirestore(), path), asistencia);
    }
    
  }

  getasistencia(path: string){
    console.log(path)
   return this.firestore.doc(path).valueChanges();
  }

  async registrarAsistencia(codigoClase: string){
    let path = `asistencia/${codigoClase}`
    let asis = {} as asistencia;
    let registro_exitoso = false;
    let Alumnoregister = this.utilserv.GetLocaStorage("user") as User;
    const validarAsist = await this.validarAsistencia(path).then(res => {
      asis = res as asistencia;
      asis.alumnos.forEach(alumno => {
        if(alumno.Uid === Alumnoregister.Uid){
          console.log("si esta");
          alumno.Estado = true;
          registro_exitoso = true;
          return;
        }
      });
      if(registro_exitoso){
        this.firestore.doc(path).update(asis);
      return asis;
      }else{
        return null;
      }
    });
    return validarAsist;
  }


}
