import { Injectable } from '@angular/core';
import { TipoDato } from '../../models/TipoDato.type';
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
    let datoTest = datos
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
}