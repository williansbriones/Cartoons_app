import { User } from "firebase/auth"

export interface clases {
    id: string,
    asignatura: string
    seccion: string
    profesor: any,
    nombre: string,
    alumnos: any[],
    horario: any[]

}