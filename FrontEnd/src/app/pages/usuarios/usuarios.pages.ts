import { Component, OnInit } from '@angular/core';

import { headerComponente } from "../../components/header/header.component";
import { BuscadorComponente } from "../../components/buscador/buscador.component";
import { BotonComponente } from "../../components/boton/boton.component";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { TagComponent } from "../../components/tags/tags.component";
import { TablaComponent } from "../../components/tabla/tabla.component";
import { ModalComponent } from "../../components/modal/modal.component";

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

  async ngOnInit() {
    await this.actualizar()
  }

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

  usuarioFiltrado?: Usuario
  cartel = false
  activo = 'usuarios';
  textoBusqueda = ''
  textoBoton = '+ Nuevo'
  modalAbierto = false
  mensajeModal = ''
  paginaActual = 1

  columnasUsuarios = [{ key: 'nombre', label: 'nombre' }, { key: 'apellido', label: 'apellido' }, { key: 'DNI', label: 'DNI' }, { key: 'email', label: 'correo' }, { key: 'telefono', label: 'telefono' }]


  CamposModal: Campo[] = [
    { tipo: 'text', nombre: 'Nombre', label: 'Nombre', placeholder: 'Juan', requerido: true },
    { tipo: 'text', nombre: 'Apellido', label: 'Apellido', placeholder: 'Perez', requerido: true },
    { tipo: 'number', nombre: 'DNI', label: 'Numero de DNI', placeholder: '40123456', requerido: true },
    { tipo: 'text', nombre: 'Email', label: 'Email', placeholder: 'usuario@email.com', requerido: true },
    { tipo: 'text', nombre: 'Telefono Celular', label: 'Telefono Celular', placeholder: '1124559071', requerido: true },
  ];

  CamposModalEditar: CampoInput[] = [
    { tipo: 'text', nombre: 'Nombre', label: 'Nombre', placeholder: 'Juan', requerido: true },
  ];

  constructor(private usuarioService: UsuariosService) { }

  actualizar() {
    this.usuarioService.obtenerUsuarios().subscribe((usuarios)=>{
      this.usuariosLLamados = usuarios
      this.usuariosTabla = this.usuariosLLamados
      this.cantidadUsuarios = this.usuariosLLamados.length
    })

  }

  buscador(input: string) {
    if(input == ''){
      this.usuariosTabla = this.usuariosLLamados
      return;
    }
    this.usuarioService.usuarioBusqueda(input).subscribe(usuarios => {
      this.usuariosTabla = usuarios
      return
    })
  }

  guardarModalUsuario(datos: Record<string, TipoDato>){
    let usuario = {
      nombre: String(datos["Nombre"]),
      apellido: String(datos["Apellido"]),
      DNI: Number(datos["DNI"]),
      email: String(datos["Email"]),
      telefono: String(datos["Telefono Celular"])
    }

    this.usuarioService.crearUsuario(usuario).subscribe((next)=>{
      setTimeout(()=>{
        this.modalAbierto = false
        this.actualizar()
      }, 250)
    })
    
  }

  editarUsuario(event: { id: string; datos: Record<string, TipoDato> }) {
    this.usuarioService.editarUsuario(event.id, event.datos).subscribe((res)=>{
      console.log(res)
    })
  }

  borrarUsuario(idUsuario: string) {
    this.usuarioService.borrarUsuario(idUsuario).subscribe((next) => {
      setTimeout(()=> {
        this.actualizar()
      }, 250)
    })
  }

  get EjPaginado(): FilaTabla[] {
    const indice = (this.paginaActual - 1) * 10;
    return this.usuariosTabla.slice(indice, indice + 10);
  }

}