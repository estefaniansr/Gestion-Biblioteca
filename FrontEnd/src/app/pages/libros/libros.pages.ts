import { Component } from "@angular/core";

import { headerComponente } from "../../components/header/header.component"; // importar el header
import { BuscadorComponente } from "../../components/buscador/buscador.component"; // importar el buscador
import { BotonComponente } from "../../components/boton/boton.component"; // importar el boton
import { FilterComponent } from "../../components/filter/filter.component"; // importar filter
import { TituloComponent } from "../../components/titulo/titulo.component"; // importar titulo
import { TagComponent } from "../../components/tags/tags.component"; // importar tags
import { TablaComponent } from "../../components/tabla/tabla.component"; // importar tabla
import { ModalComponent } from "../../components/modal/modal.component"; // importar modal

@Component({
    selector: 'app-libros',
    standalone: true,
    imports: [headerComponente, BuscadorComponente, BotonComponente, FilterComponent, TituloComponent, TagComponent, TablaComponent, ModalComponent], // importas los componentess
    templateUrl: './libros.pages.html',
    styleUrl: './libros.pages.css'
})

export class LibrosPages {
    // inicializacion 

    activo = 'libros'// estado general de la app
    textoBusqueda = '' // guarda lo que escribe el user
    textoBoton = '+ Nuevo' // titulo del btn x defecto
    modalAbierto = false // el modal esta cerrado x defecto
    filtroSeleccionado = '' // el filtro seleccionado esta vacio x defecto
    paginaActual = 1 // la pag actual esta x defecto en la 1
}



/*import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { headerComponente } from './components/header/header.component'; // importar el header
import { BuscadorComponente } from './components/buscador/buscador.component'; // importar el buscador
import { BotonComponente } from './components/boton/boton.component'; // importar el boton
import { FilterComponent } from './components/filter/filter.component'; // importar filter
import { TituloComponent } from './components/titulo/titulo.component'; // importar titulo
import { TagComponent } from './components/tags/tags.component'; // importar tags
import { TablaComponent } from './components/tabla/tabla.component'; // importar tabla
import { ModalComponent } from './components/modal/modal.component'; // importar modal
import { CardComponent } from './components/cards/cards.component'; // importar las cards
import { Campo } from './models/campo.type'; // importar la interface de campo
import { TipoDato } from './models/TipoDato.type';
import { FilaTabla } from './models/filaTabla.type';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, headerComponente, BuscadorComponente, BotonComponente, FilterComponent, TituloComponent, TagComponent, TablaComponent, ModalComponent, CardComponent], // importas los componentess
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  // inicializacion 
  activo = 'libros'; // estado general de la app
  textoBusqueda = '' // guarda lo que escribe el user
  textoBoton = '+ Nuevo' // titulo del btn x defecto
  modalAbierto = false // el modal esta cerrado x defecto
  filtroSeleccionado = '' // el filtro seleccionado esta vacio x defecto
  paginaActual = 1 // la pag actual esta x defecto en la 1

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

  ejemplo: any[] = [
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },
    { campo1: 'ej', campo2: 'ej', campo3: 'ej' },

  ]; // prueba

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
    return this.ejemplo.slice(indice, indice + 10); // recorre el array y devuelve solo 10 elementos, desde indice hasta indice + 10
  }


}


*/