import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoDato } from '../../models/TipoDato.type';
import { Observable } from 'rxjs';
import { FilaTabla } from '../../models/filaTabla.type';

import { Usuario } from '../../models/usuarios.model';

@Injectable({
    providedIn: 'root' // el servicio esta disponible globalmente
})

export class UsuariosService {
    url = 'http://127.0.0.1:3000/usuarios'
    async obtenerUsuarios(arrayEscribir: Usuario[]){
        try{
            let respuesta = await fetch(this.url)
            let datos = await respuesta.json()
            let usuariosLLamados = datos
            usuariosLLamados.forEach((datos:any)=>{
                arrayEscribir.push({
                    _id:datos._id,
                    nombre: `${datos.nombre}`,
                    apellido: `${datos.apellido}`,
                    DNI: Number(`${datos.DNI}`),
                    email: `${datos.email}`,
                    telefono: Number(`${datos.telefono}`)
                })
            })
            console.log('hola')
            console.log(arrayEscribir)
            return arrayEscribir
        }
        catch(error){
            console.log('Error al obtener Usuarios')
            return []
        }
    }
//       async obtenerUsuarios(){
//     this.usuariosTabla = []

//     try{
//       let respuesta = await fetch('http://127.0.0.1:3000/usuarios')
//       let datos = await respuesta.json()
//       this.usuariosLLamados = datos
//       this.usuariosLLamados.forEach((datos)=>{
//         this.usuariosTabla.push({
//           _id: datos._id,
//           nombre: `${datos.nombre}`,
//           apellido: `${datos.apellido}`,
//           DNI: `${datos.DNI}`,
//           email: `${datos.email}`,
//           telefono: `${datos.telefono}`
//         })
//       })
//     }
//     catch(error){
//       console.log('error al obtener usuarios')
//     }
//   }
}