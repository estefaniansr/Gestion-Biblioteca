import { Component, OnInit } from '@angular/core';

import { headerComponente } from '../components/header/header.component';
import { BuscadorComponente } from '../components/buscador/buscador.component'; // importar el buscador
import { BotonComponente } from '../components/boton/boton.component'; // importar el boton
import { FilterComponent } from '../components/filter/filter.component'; // importar filter
import { TituloComponent } from '../components/titulo/titulo.component'; // importar titulo
import { TagComponent } from '../components/tags/tags.component'; // importar tags
import { TablaComponent } from '../components/tabla/tabla.component'; // importar tabla
import { ModalComponent } from '../components/modal/modal.component'; // importar modal
import { CardComponent } from '../components/cards/cards.component'; // importar las cards
import { Campo } from '../models/campo.type'; // importar la interface de campo
import { TipoDato } from '../models/TipoDato';
import { FilaTabla } from '../models/filaTabla.type';

interface Usuario {
  id:string,
  nombre: string,
  apellido: string,
  DNI: string,
  email:string,
  telefono:string
}

@Component({
  selector: 'app-usuarios',
  imports: [headerComponente, ModalComponent, BuscadorComponente, TituloComponent, FilterComponent, BotonComponente, TagComponent, TablaComponent, CardComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})


export class UsuariosComponent implements OnInit {

  //ngOnInit ejecuta un codigo una vez cargo la pagina.
  ngOnInit(): void {
    console.log('Hola, esto deberia verse al cargar la pagina')
  }

  probandoCosas(){
    this.getTodosLosUsuarios()
  }

  getTodosLosUsuarios(){
    //Limpiamos la tabla de usuarios local, por si anteriormente añadimos un usuario, que no quede duplicado.
    this.usuariosTabla = []

    try{
      fetch('http://127.0.0.1:3000/usuarios')
    .then(respuesta => respuesta.json())
    .then(data => {
      this.usuariosLLamados = data
      this.usuariosLLamados.forEach((dato)=>{
        this.usuariosTabla.push({
          campo1: `${dato.nombre}\n ${dato.apellido}`,
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

  usuariosLLamados:Usuario[] = []

  usuariosTabla: any[] = [
  ];

  titulo = 'Usuarios'
  subtitulo = 'nada x ahora'
  cantidadUsuarios = 0
  //cosas necesarias por componentes, no declarado por UsuariosComponent:
  activo = 'usuarios'; // estado general de la app
  textoBusqueda = '' // guarda lo que escribe el user
  textoBoton = '+ Nuevo' // titulo del btn x defecto
  modalAbierto = false // el modal esta cerrado x defecto
  filtroSeleccionado = '' // el filtro seleccionado esta vacio x defecto
  paginaActual = 2 // la pag actual esta x defecto en la 1

  // campos

  CamposModal: Campo[] = [ // los campos que van al formulario del modal, editables
    { tipo: 'text', nombre: 'Ejemplo requerido', label: 'ej', placeholder: 'Ej: Ejemplo', requerido: true },
    { tipo: 'number', nombre: 'ej', label: 'ej', placeholder: 'ej' },
    {
      tipo: 'select',
      nombre: 'ej',
      label: 'ej',
      requerido: true,
      opciones: [
        { valor: 'ej', texto: 'ej' },
      ]
    }
  ];

  CamposCard: Campo[] = [ // campos que van cuandoe editas las card
    { tipo: 'text', nombre: 'titulo', label: 'Nombre', requerido: true },
  ];


  // modal

  abrirModal() { // abre el modal
    this.modalAbierto = true
  }

  GuardarModal() { // guarda los cambios del modal
    console.log('Libro guardado');
  }

  // filtrado

  filtrado(valor: string) { // recibe el texto emitido x el componente
    this.textoBusqueda = valor // lo guarda en el componente
  }

  onFiltrar(valor: string) { // pasa un valor x argumento
    this.filtroSeleccionado = valor // y el filtro seleccionado se le pone el valor del argumento
  }

  // acciones

  Guardar(datos: Record<string, TipoDato>) { // pasa datos que es una clave string y un valor de la interfaz
    console.log("guardado", datos)
  }

  Editar(datos: Record<string, TipoDato>) {
    console.log('editado', datos)
  }

  Eliminar() {
    console.log("Eliminado")
  }


  // paginas

  get EjPaginado(): FilaTabla[] { //datos paginados, maximo 10
    const indice = (this.paginaActual - 1) * 10; //  calcula el indice segun la pag igual (-1 asi es 0) * 10
    return this.usuariosTabla.slice(indice, indice + 10); // recorre el array y devuelve solo 10 elementos, desde indice hasta indice + 10
  }

}
