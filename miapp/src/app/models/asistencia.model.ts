import { alumnoAsist } from "./alumnoAsist.model"

export interface asistencia {
    codigo: string,
    dia: string 
    mes: string
    alumnos: alumnoAsist[]
}