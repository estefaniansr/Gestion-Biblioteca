import { Component, OnInit } from "@angular/core";


// componentes
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
import { CampoSelect } from "../../models/campoSelect.interface";
import { Categoria } from "../../models/categoria.interface";

// services
import { LibrosService } from "../services/libros.services";
import { CategoriasService } from "../services/categorias.services";
import { PrestamosService } from "../services/prestamos.services";

@Component({
    selector: 'app-libros',
    standalone: true,
    imports: [headerComponente, BuscadorComponente, BotonComponente, TituloComponent, TagComponent, TablaComponent, ModalComponent], // importas los componentess
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
    totalPrestados = 0
    totalDevueltos = 100
    cantidadTotalCategoria = 0
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
            opciones: []
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

    constructor(private librosService: LibrosService, private categoriasService: CategoriasService, private prestamosService: PrestamosService) { } // servicio que se comunica con la API

    cargarDatos() {
        this.librosService.ObtenerLibros().subscribe({
            next: (libros) => {
                // console.log(libros);
                this.datosTablaArray = libros
                this.cantidadTotal = libros.length
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    cargarPrestados() {
        this.prestamosService.ObtenerPrestamos().subscribe({
            next: (prestamo) => {
                // console.log(prestamo)
                const activo = prestamo.filter(
                    p => p.estado === 'Activo'
                )
                this.totalPrestados = activo.length
            }
        })
    }

    cargarDevueltos() {
        this.prestamosService.ObtenerPrestamos().subscribe({
            next: (prestamo) => {
                // console.log(prestamo)
                const activo = prestamo.filter(
                    p => p.estado === 'Devuelto'
                )
                this.totalDevueltos = activo.length
            }
        })
    }

    cargarCategorias() {
        this.categoriasService.ObtenerCategorias().subscribe({
            next: (cate) => {
                // console.log(cate)
                this.cantidadTotalCategoria = cate.length

                const campoCategoria = this.CamposModal.find( // crea un const que busca en el campo modal el nombre categoria
                    campo => campo.nombre === 'categoria'
                ) as CampoSelect // find devuelve campoSelect

                if (campoCategoria) { // si existe
                    campoCategoria.opciones = cate.map(categoria => ({
                        valor: categoria.nombre,
                        texto: categoria.nombre
                    }))
                }
            }, error: (e) => console.error(e)
        })
    }

    ngOnInit(): void { // se ejecuta automaticamente al cargar el componente
        this.cargarDatos()
        this.cargarCategorias()
        this.cargarPrestados()
        this.cargarDevueltos()

    }

    // modal
    abrirModal() { // abre el modal
        this.modalAbierto = true
    }

    GuardarModal() { // guarda los cambios del modal
        // console.log('Libro guardado');
    }

    // acciones 

    Guardar(datos: Record<string, TipoDato>) {
        this.librosService.CrearLibro(datos).subscribe({ // libroServices tiene el metodo CrearLibro que pasa por argumentos datos y ejecuta subscribe escucha la respuesta del http
            next: (res) => {  // se ejecuta cuando el servidor da ok
                // console.log('Libro creado', res) // depurar
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
                // console.log(res)
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

                // console.log('Libro editado', res)

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
                // console.log(res)
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











