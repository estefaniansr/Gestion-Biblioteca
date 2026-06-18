import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoDato } from '../../models/TipoDato.type';
import { Observable, ReplaySubject } from 'rxjs';
import { FilaTabla } from '../../models/filaTabla.type';

import { Usuario } from '../../models/usuarios.model';

@Injectable({
    providedIn: 'root' // el servicio esta disponible globalmente
})

export class UsuariosService {
    private url = 'http://127.0.0.1:3000/usuarios'

    async obtenerUsuarios(){
        try{
            let respuesta = await fetch(this.url)
            let datos = await respuesta.json()
            let usuariosLLamados = datos
            let arrayEscribir:Usuario[] = []
            usuariosLLamados.forEach((datos:Usuario)=>{
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

    async usuarioBusqueda(input:string){
        try {
            
            let respuesta = await fetch(`${this.url}/buscar/${input}`)
            let datos = await respuesta.json()

            let usuariosLLamados = datos
            let arrayEscribir:Usuario[] = []

            usuariosLLamados.forEach(( dato:Usuario ) => {
                arrayEscribir.push({
                    _id: dato._id,
                    nombre: `${dato.nombre}`,
                    apellido: `${dato.apellido}`,
                    DNI: Number(`${dato.DNI}`),
                    email: `${dato.email}`,
                    telefono: Number(`${dato.telefono}` )
                })
            })
            return arrayEscribir
        }
        catch(error){
            console.log('Error al realizar la busqueda')
            return []
        }
    }

    async crearUsuario(pNombre:string, pApellido:string, pDNI:string | number, pEmail:string, pTelefono:string | number):Promise<Response>{
        try{
            let respuesta = await fetch(`${this.url}/crear`,{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    nombre: pNombre,
                    apellido: pApellido,
                    DNI: Number(pDNI),
                    email: pEmail,
                    telefono: Number(pTelefono)
                })
            })
            return respuesta
        }
        catch(error){
            console.log('Error al crear Usuario')
            throw error
        }
    }

  async editarUsuario(pId:string, datos:Record<string, TipoDato>){
    try{
      console.log(datos)
      let respuesta = await   fetch(`${this.url}/modificar/${pId}`, {
        method:"PUT",
        headers:{
          "Content-Type" : "application/json"
                },
        body: JSON.stringify(datos)
      })

      return respuesta

    }
    catch(error){
      console.log('Error al intentar editar Usuario')
      throw error
    }
  }
  
  async borrarUsuario(datos:string){
    console.log('antes del fetch')
    let datoTest = datos
    console.log(datoTest)
    try{
      let respuesta = await fetch(`${this.url}/borrar/${datoTest}`, {
        method: "DELETE"
      })
      return respuesta
    }
    catch(error){
      console.log('Error al intentar borrar usuario')
      throw error
    }
  }

/*
  async guardarModalBorrar(datos: Record<string, TipoDato>){
    console.log('antes del fetch')

    try{
      let respuesta = await fetch(`http://127.0.0.1:3000/usuarios/borrar/${String(this.usuarioFiltrado?.DNI)}`,{
        method: "DELETE"
      })
      
      if (respuesta.ok == true){
        this.modalBorrarAbierto = false
        this.mensajeModal = `<h1>Usuario con DNI: ${this.usuarioFiltrado?.DNI} borrado exitosamente</h1>`
        this.cartel = true
        setTimeout(()=>{
          this.cartel = false
        }, 3000)
      }
      }

    catch(error){
      console.log('Ocurrio un error')
    }
  }
*/

/*
   async crearUsuario(){
      try{
        let respuesta = await fetch(`http://127.0.0.1:3000/usuarios/crear`,
          {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nombre: this.datosdeModal.nombre,
              apellido: this.datosdeModal.apellido,
              DNI: this.datosdeModal.DNI,
              email: this.datosdeModal.email,
              telefono: this.datosdeModal.telefono
            })
          }
        )

        if(respuesta.ok == true){
          this.modalAbierto = false
          this.mensajeModal = `<h1>Usuario creado exitosamente</h1>`
          this.cartel = true
          setTimeout(()=>{
            this.cartel = false
          }, 3000)
        }
        else if(respuesta.ok == false){
          this.modalAbierto = false
          this.mensajeModal = `<h1>El usuario no pudo ser creado
          <br>
          <br>El DNI ${this.datosdeModal.DNI} ya se encuentra registrado.
          </h1>`
          this.cartel = true
          setTimeout(()=>{
            this.cartel = false
          }, 5000)
        }
      }
      catch(error){
        console.log('Error en crearUsuario')
        console.log(error)
      }
    }
*/


/*       async usuarioBusqueda(input:string){
    this.usuariosTabla = []

    try{
      let respuesta = await fetch(`http://127.0.0.1:3000/usuarios/${input}`)
      let datos = await respuesta.json()
      this.usuariosLLamados = datos
      console.log(this.usuariosLLamados)
      this.usuariosLLamados.forEach((dato)=>{
        this.usuariosTabla = [{
          _id: dato._id,
          nombre: `${dato.nombre}`,
          apellido: `${dato.apellido}`,
          DNI: `${dato.DNI}`,
          email: `${dato.email}`,
          telefono: `${dato.telefono}`
        }
        ]

      })
      return datos
    }
    catch(error){
      console.log('error al buscar')
    }
  } */
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