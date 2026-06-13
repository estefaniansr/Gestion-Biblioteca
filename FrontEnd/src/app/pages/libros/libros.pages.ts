import { Component, OnInit } from "@angular/core";


// componentes
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

// services
import { LibrosService } from "../services/libros.services";

@Component({
    selector: 'app-libros',
    standalone: true,
    imports: [headerComponente, BuscadorComponente, BotonComponente, FilterComponent, TituloComponent, TagComponent, TablaComponent, ModalComponent], // importas los componentess
    templateUrl: './libros.pages.html',
    styleUrl: './libros.pages.css'
})

export class LibrosPages implements OnInit { // implementa la interfaz onInit de angular para que poder usar sus metodos
    // inicializacion 

    activo = 'libros'// estado general de la app
    textoBusqueda = '' // guarda lo que escribe el user
    modalAbierto = false // el modal esta cerrado x defecto
    filtroSeleccionado = '' // el filtro seleccionado esta vacio x defecto
    paginaActual = 1 // la pag actual esta x defecto en la 1
    cantidadTotal = 2
    cantidad = 0
    columnas = [
        { key: 'libro', label: 'Libro' },
        { key: 'autor', label: 'Autor' },
        { key: 'categoria', label: 'Categoría' },
    ]

    CamposModal: Campo[] = [ // los campos que van al formulario del modal, editables
        { tipo: 'text', nombre: 'libro', label: 'Nombre', placeholder: 'El principito', requerido: true },
        { tipo: 'text', nombre: 'autor', label: 'Autor', placeholder: 'Antoine de Saint-Exupéry', requerido: true },
        {
            tipo: 'select',
            nombre: 'categoria',
            label: 'Categoria',
            requerido: true,
            opciones: [
                { valor: 'Novela', texto: 'Novela' },
                { valor: 'Novela', texto: 'Novela' },
            ]
        }
    ];
    opcionFilter = [
        'Recientes',
        'Antiguos',
        'Título A-Z',
        'Título Z-A',
        'Autor A-Z',
        'Autor Z-A',
        'No func'
    ]






    constructor(private librosService: LibrosService) { } // servicio que se comunica con la API

    cargarDatos() {
        this.librosService.ObtenerLibros().subscribe({
            next: (libros) => {
                console.log(libros);
                this.datosTablaArray = libros
                this.cantidadTotal = libros.length
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    ngOnInit(): void { // se ejecuta automaticamente al cargar el componente
        this.cargarDatos()

    }

    // modal
    abrirModal() { // abre el modal
        this.modalAbierto = true
    }

    GuardarModal() { // guarda los cambios del modal
        console.log('Libro guardado');
    }

    // acciones 

    Guardar(datos: Record<string, TipoDato>) {
        this.librosService.CrearLibro(datos).subscribe({ // libroServices tiene el metodo CrearLibro que pasa por argumentos datos y ejecuta subscribe escucha la respuesta del http
            next: (res) => {  // se ejecuta cuando el servidor da ok
                console.log('Libro creado', res) // depurar
                this.cargarDatos() //  recarga la tabla
                this.modalAbierto = false // cierra el modal
            },
            error: (err: string) => { // si tira error el server
                console.log("Error al crear el libro", err)
            }
        }
        )
    }


    Eliminar(id: string) {
        this.librosService.EliminarLibro(id).subscribe({
            next: (res) => {
                console.log(res)
                this.cargarDatos()
            },
            error: (err: string) => {
                console.log(err)
            }
        })

    }

    Editar(id: string, datos: Record<string, TipoDato>) {

        this.librosService.editarLibro(id, datos).subscribe({
            /*
            * llama al servicio que hace la peticion put al back
            * se envia el id del libro y los nuevos datos actualizados
             */

            next: (res) => { // se ejecuta cuando el backend responde correctamente

                console.log('Libro editado', res)

                this.cargarDatos() // llama al metodo recargar datos

            },

            error: (err) => {

                console.log(err)

            }

        })

    }

    Buscador(input: string) {
        this.librosService.buscarLibro(input).subscribe({
            next: (res) => {
                console.log(res)
                this.datosTablaArray = res
            }, error: (err: string) => {
                console.log(err)
            }
        })
    }



    // filtrado


    onFiltrar(valor: string) { // pasa un valor x argumento
        this.filtroSeleccionado = valor // y el filtro seleccionado se le pone el valor del argumento
    }




    // paginas

    datosTablaArray: FilaTabla[] = []

    get EjPaginado(): FilaTabla[] { //datos paginados, maximo 10
        const indice = (this.paginaActual - 1) * 10; //  calcula el indice segun la pag igual (-1 asi es 0) * 10
        return this.datosTablaArray.slice(indice, indice + 10); // recorre el array y devuelve solo 10 elementos, desde indice hasta indice + 10
    }

}











