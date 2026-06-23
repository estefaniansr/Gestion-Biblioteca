import { Component, OnInit } from '@angular/core';

import { headerComponente } from "../../components/header/header.component"; // importar el header
import { BuscadorComponente } from "../../components/buscador/buscador.component"; // importar el buscador
import { BotonComponente } from "../../components/boton/boton.component"; // importar el boton
import { TituloComponent } from "../../components/titulo/titulo.component"; // importar titulo
import { TagComponent } from "../../components/tags/tags.component"; // importar tags
import { TablaComponent } from "../../components/tabla/tabla.component"; // importar tabla
import { ModalComponent } from "../../components/modal/modal.component"; // importar modal

// types e interfaces
import { Campo } from "../../models/campo.type";
import { TipoDato } from "../../models/TipoDato.type";
import { FilaTabla } from "../../models/filaTabla.type";
import { CampoInput } from '../../models/campoInput.interface';
import { Usuario } from '../../models/usuarios.model';
import { UsuariosService } from '../../pages/services/usuarios.services';

@Component({
  selector: 'app-usuarios',
  imports: [headerComponente, ModalComponent, BuscadorComponente, TituloComponent, BotonComponente, TagComponent, TablaComponent],
  templateUrl: './usuarios.pages.html',
  styleUrl: './usuarios.pages.css'
})


export class UsuariosPages implements OnInit {

  //ngOnInit ejecuta un codigo una vez cargo la pagina.
  async ngOnInit(): Promise<void> {
    await this.actualizar()
  }

  constructor(private usuarioService: UsuariosService) { }

  usuariosLLamados: Usuario[] = []

  usuariosTabla: Usuario[] = [];

  titulo = 'Usuarios'
  tituloModal = ''
  subtitulo = 'Crear, buscar, editar y eliminar usuarios.'
  cantidadUsuarios = 0
  datosdeModal: Usuario = {
    _id: '0',
    nombre: '',
    apellido: '',
    DNI: 0,
    email: '',
    telefono: 0,
  }

  modalBorrarAbierto = false
  usuarioFiltrado?: Usuario
  cartel = false
  //cosas necesarias por componentes, no declarado por UsuariosComponent:
  activo = 'usuarios'; // estado general de la app
  textoBusqueda = '' // guarda lo que escribe el user
  textoBoton = '+ Nuevo' // titulo del btn x defecto
  modalAbierto = false // el modal esta cerrado x defecto
  mensajeModal = ''
  paginaActual = 1 // la pag actual esta x defecto en la 1

  columnasUsuarios = [{ key: 'nombre', label: 'nombre' }, { key: 'apellido', label: 'apellido' }, { key: 'DNI', label: 'DNI' }, { key: 'email', label: 'correo' }, { key: 'telefono', label: 'telefono' }]
  // campos

  CamposModal: Campo[] = [ // los campos que van al formulario del modal, editables
    { tipo: 'text', nombre: 'Nombre', label: 'Nombre', placeholder: 'Juan', requerido: true },
    { tipo: 'text', nombre: 'Apellido', label: 'Apellido', placeholder: 'Perez', requerido: true },
    { tipo: 'number', nombre: 'DNI', label: 'Numero de DNI', placeholder: '40123456', requerido: true },
    { tipo: 'text', nombre: 'Email', label: 'Email', placeholder: 'usuario@email.com', requerido: true },
    { tipo: 'text', nombre: 'Telefono Celular', label: 'Telefono Celular', placeholder: '1124559071', requerido: true },
  ];

  CamposModalEditar: CampoInput[] = [ // los campos que van al formulario del modal, editables
    { tipo: 'text', nombre: 'Nombre', label: 'Nombre', placeholder: 'Juan', requerido: true },
  ];

  async actualizar() {
    this.usuariosTabla = []
    this.usuariosLLamados = []

    this.usuariosLLamados = await this.usuarioService.obtenerUsuarios()

    this.usuariosTabla = this.usuariosLLamados

    this.cantidadUsuarios = this.usuariosLLamados.length
  }

  async buscador(input: string) {
    try {
      let respuesta = await this.usuarioService.usuarioBusqueda(input);
      this.usuariosTabla = respuesta;
    } catch (error) {
      console.log('error al buscar');
    }
  }

  abrirModal() { // abre el modal
    this.modalAbierto = true
  }

  abrirModalBorrar() {
    this.modalBorrarAbierto = true
    this.modalAbierto = false
  }

  // filtrado

  async filtrado(valor: string) { // recibe el texto emitido x el componente
    let texto = valor
    this.usuariosTabla = await this.usuarioService.usuarioBusqueda(texto)

    if (texto == '') {
      this.usuariosTabla = this.usuariosLLamados
    }
  }

  // acciones

  async guardarModalUsuario(datos: Record<string, TipoDato>) { // pasa datos que es una clave string y un valor de la interfaz
    this.datosdeModal.nombre = String(datos["Nombre"])
    this.datosdeModal.apellido = String(datos["Apellido"])
    this.datosdeModal.DNI = Number(datos["DNI"])
    this.datosdeModal.email = String(datos["Email"])
    this.datosdeModal.telefono = Number(datos["Telefono Celular"])


    let respuesta = await this.usuarioService.crearUsuario(this.datosdeModal.nombre,
      this.datosdeModal.apellido,
      this.datosdeModal.DNI,
      this.datosdeModal.email,
      this.datosdeModal.telefono)

    if (respuesta.ok == true) {
      this.modalAbierto = false
      this.mensajeModal = `<h2>Usuario creado correctamente</h2>`
      this.cartel = true

      this.cerrarModales()
    }
    else if (respuesta.ok == false) {
      this.modalAbierto = false
      this.mensajeModal = `<h2>Error
      <br>El numero de DNI: ${this.datosdeModal.DNI} ya esta registrado</h2>`
      this.cartel = true

      this.cerrarModales()
    }
    this.modalAbierto = false
    this.actualizar()
  }

  async editarUsuario(event: { id: string; datos: Record<string, TipoDato> }) {
    const usuario: Usuario = {
      _id: event.id,
      nombre: String(event.datos["Nombre"] ?? ""),
      apellido: String(event.datos["Apellido"] ?? ""),
      DNI: Number(event.datos["DNI"] ?? 0),
      email: String(event.datos["Email"] ?? ""),
      telefono: Number(event.datos["Telefono Celular"] ?? 0),
    };

    await this.usuarioService.editarUsuario(usuario._id, usuario);
  }

  eliminarUsuarioBoton(id: String | Number) {
    this.usuarioFiltrado = this.usuariosLLamados.find(usuario => usuario._id == id)
    this.mensajeModal = `<h1>Desea borrar este usuario?</h1>
  <br>
  <h2>Nombre: ${this.usuarioFiltrado?.nombre}
  <br>
  Apellido: ${this.usuarioFiltrado?.apellido}
  <br>
  DNI: ${this.usuarioFiltrado?.DNI}
  </h2>`

    this.abrirModalBorrar()
  }

  async guardarModalBorrar(datos: Record<string, TipoDato>) {

    if (!this.usuarioFiltrado?._id) {
      console.log('No existe este usuario')
      return
    }

    let respuesta = await this.usuarioService.borrarUsuario(this.usuarioFiltrado._id)

    if (respuesta.ok == true) {
      this.modalBorrarAbierto = false
      this.mensajeModal = `<h2>Usuario borrado con DNI: ${this.usuarioFiltrado.DNI}
      <br>borrado correctamente</h2>`
      this.cartel = true

      this.cerrarModales()

      this.actualizar()
    }
  }

  cerrarModales() {
    setTimeout(() => {
      this.modalAbierto = false
      this.modalBorrarAbierto = false
      this.cartel = false
    }, 2500)
  }

  // paginas

  get EjPaginado(): FilaTabla[] { //datos paginados, maximo 10
    const indice = (this.paginaActual - 1) * 10; //  calcula el indice segun la pag igual (-1 asi es 0) * 10
    return this.usuariosTabla.slice(indice, indice + 10); // recorre el array y devuelve solo 10 elementos, desde indice hasta indice + 10
  }

}