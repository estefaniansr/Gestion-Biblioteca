import { Component, OnInit } from '@angular/core';

import { headerComponente } from "../../components/header/header.component"; // importar el header
import { BuscadorComponente } from "../../components/buscador/buscador.component"; // importar el buscador
import { BotonComponente } from "../../components/boton/boton.component"; // importar el boton
import { FilterComponent } from "../../components/filter/filter.component"; // importar filter
import { TituloComponent } from "../../components/titulo/titulo.component"; // importar titulo
import { TagComponent } from "../../components/tags/tags.component"; // importar tags
import { TablaComponent } from "../../components/tabla/tabla.component"; // importar tabla
import { ModalComponent } from "../../components/modal/modal.component"; // importar modal

// types e interfaces
import { Campo } from "../../models/campo.type";
import { TipoDato } from "../../models/TipoDato.type";
import { FilaTabla } from "../../models/filaTabla.type";
import { using } from 'rxjs';
import { CampoInput } from '../../models/campoInput.interface';


interface Usuario {
  _id: Number,
  nombre: string,
  apellido: string,
  DNI: number,
  email:string,
  telefono:string
}

@Component({
  selector: 'app-usuarios',
  imports: [headerComponente, ModalComponent, BuscadorComponente, TituloComponent, FilterComponent, BotonComponente, TagComponent, TablaComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})


export class UsuariosComponent implements OnInit {

  //ngOnInit ejecuta un codigo una vez cargo la pagina.
  ngOnInit(): void {
    console.log('Hola, esto deberia verse al cargar la pagina')
  }

  usuariosLLamados:Usuario[] = []

  usuariosTabla: any[] = [
  ];

  titulo = 'Usuarios'
  tituloModal = ''
  subtitulo = 'nada x ahora'
  cantidadUsuarios = this.usuariosTabla.length
  datosdeModal:Usuario = {
    _id: 0,
    nombre: '',
    apellido: '',
    DNI: 0,
    email: '',
    telefono: '',
  }
  modalBorrarAbierto = false
  usuarioFiltrado?:Usuario
  cartel = false
  //cosas necesarias por componentes, no declarado por UsuariosComponent:
  activo = 'usuarios'; // estado general de la app
  textoBusqueda = '' // guarda lo que escribe el user
  textoBoton = '+ Nuevo' // titulo del btn x defecto
  modalAbierto = false // el modal esta cerrado x defecto
  filtroSeleccionado = 'nombre'
  mensajeModal = 'HJOLA CHICOS'
  paginaActual = 2 // la pag actual esta x defecto en la 1

  columnas = [{key: 'nombre', label:'hola'}]
  // campos

  CamposModal: Campo[] = [ // los campos que van al formulario del modal, editables
    { tipo: 'text', nombre: 'Nombre', label: 'Nombre', placeholder: 'Juan', requerido: true },
    { tipo: 'text', nombre: 'Apellido', label: 'Apellido', placeholder: 'Perez', requerido:true },
    { tipo: 'number', nombre: 'DNI', label: 'Numero de DNI', placeholder:'40123456', requerido: true},
    { tipo: 'text', nombre: 'Email', label: 'Email', placeholder:'usuario@email.com', requerido: true},
    { tipo: 'text', nombre: 'Telefono Celular', label: 'Telefono Celular', placeholder:'1124559071', requerido: true},
  ];

    CamposModalEditar: CampoInput[] = [ // los campos que van al formulario del modal, editables
    { tipo: 'text', nombre: 'Nombre', label: 'Nombre', placeholder: 'Juan', requerido: true },
  ];

  CamposModalBorrar: any[] = [ // los campos que van al formulario del modal, editables
    'hola'
  ];

  CamposCard: Campo[] = [ // campos que van cuandoe editas las card
    { tipo: 'text', nombre: 'titulo', label: 'Nombre', requerido: true },
  ];

    async probandoCosas(){
      
  }

  async getTodosLosUsuarios(){
    //Limpiamos la tabla de usuarios local, por si anteriormente añadimos un usuario, que no quede duplicado.
    this.usuariosTabla = []

    try{
    const respuesta = await fetch('http://127.0.0.1:3000/usuarios')
    .then(respuesta => respuesta.json())
    .then(data => {
      this.usuariosLLamados = data
      console.log(this.usuariosLLamados)
      this.usuariosLLamados.forEach((dato)=>{
        this.usuariosTabla.push({
          _id: dato._id,
          nombre: `${dato.nombre}\n ${dato.apellido}`,
          campo2: `${dato.email}\n${dato.telefono}`,
          campo3: `${dato.DNI}`
        }
        )
        this.cantidadUsuarios = this.usuariosTabla.length
      })
    })
    .catch(error => {
      console.log(error)
    })
    }
    catch(error){
      console.log('Error al traer los usuarios')
    }
  }

  async getUsuarioBusqueda() {
        this.usuariosTabla = []
        try{
          await fetch(`http://127.0.0.1:3000/usuarios/${this.filtroSeleccionado}/${this.textoBusqueda}`)
          .then(respuesta => respuesta.json())
          .then(data => {
            this.usuariosLLamados = data
            this.usuariosLLamados.forEach((dato)=>{
              this.usuariosTabla.push({
                nombre: `${dato.nombre}\n ${dato.apellido}`,
                campo2: `${dato.email}\n${dato.telefono}`,
                campo3: `${dato.DNI}`
              })
            })
          })
        }
        catch(error){
          console.log(`Error al traer al usuario con el ${this.filtroSeleccionado} ${this.textoBusqueda}`)
        }
    }

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
          this.getTodosLosUsuarios()
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

  // modal

  abrirModal() { // abre el modal
    this.modalAbierto = true
  }

  abrirModalBorrar(){
    this.modalBorrarAbierto = true
    this.modalAbierto = false
  }

  // filtrado

  filtrado(valor:any) { // recibe el texto emitido x el componente
    this.textoBusqueda = valor // lo guarda en el componente
  }

  onFiltrar(valor:any) { // pasa un valor x argumento
    
    this.filtroSeleccionado = valor // y el filtro seleccionado se le pone el valor del argumento
    console.log(this.filtroSeleccionado)
  }

  // acciones

  async guardarModalUsuario(datos: Record<string, TipoDato>) { // pasa datos que es una clave string y un valor de la interfaz
    this.datosdeModal.nombre = String(datos["Nombre"])
    this.datosdeModal.apellido = String(datos["Apellido"])
    this.datosdeModal.DNI = Number(datos["DNI"])
    this.datosdeModal.email = String(datos["Email"])
    this.datosdeModal.telefono = String(datos["Telefono Celular"])

    await this.crearUsuario()

    this.modalAbierto = false
  }

  editarUsuario(datos:any){
    this.tituloModal = 'Editar usuario'
    this.usuarioFiltrado = this.usuariosLLamados.find(usuario => usuario._id == datos.id)
    console.log(this.usuarioFiltrado)
    this.CamposModalEditar[0].placeholder = this.usuarioFiltrado?.nombre
    this.cartel = true
    this.mensajeModal = `'me encanta la hambuerguesa con papas'`
  }

  eliminarUsuarioBoton(id:String | Number) {
  this.usuarioFiltrado = this.usuariosLLamados.find(usuario => usuario._id == id)
  console.log(this.usuarioFiltrado)

  this.abrirModalBorrar()
  }

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
        this.getTodosLosUsuarios()
        setTimeout(()=>{
          this.cartel = false
        }, 3000)
      }
      }

    catch(error){
      console.log('Ocurrio un error')
    }
  }

  // paginas

  get EjPaginado(): FilaTabla[] { //datos paginados, maximo 10
    const indice = (this.paginaActual - 1) * 10; //  calcula el indice segun la pag igual (-1 asi es 0) * 10
    return this.usuariosTabla.slice(indice, indice + 10); // recorre el array y devuelve solo 10 elementos, desde indice hasta indice + 10
  }

}
