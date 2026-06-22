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
    imports: [headerComponente, BuscadorComponente, BotonComponente, TituloComponent, TagComponent, TablaComponent, ModalComponent],
    templateUrl: './libros.pages.html',
    styleUrl: './libros.pages.css'
})

export class LibrosPages implements OnInit {
    // implementa la interfaz onInit de angular para que poder usar sus metodos

    activo = 'libros'
    textoBusqueda = ''
    modalAbierto = false
    filtroSeleccionado = ''
    paginaActual = 1
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

    CamposModal: Campo[] = [
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

    constructor(private librosService: LibrosService, private categoriasService: CategoriasService, private prestamosService: PrestamosService) { } // servicio que se comunica con el service

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

    cargarPrestados() {
        this.prestamosService.ObtenerPrestamos().subscribe({
            next: (prestamo) => {
                console.log(prestamo)
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
                console.log(prestamo)
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
                console.log(cate)
                this.cantidadTotalCategoria = cate.length

                const campoCategoria = this.CamposModal.find(
                    campo => campo.nombre === 'categoria'
                ) as CampoSelect

                if (campoCategoria) {
                    campoCategoria.opciones = cate.map(categoria => ({
                        valor: categoria.nombre,
                        texto: categoria.nombre
                    }))
                }
            }, error: (e) => console.error(e)
        })
    }

    ngOnInit(): void { //  cuando carga el componente
        this.cargarDatos()
        this.cargarCategorias()
        this.cargarPrestados()
        this.cargarDevueltos()

    }

    abrirModal() {
        this.modalAbierto = true
    }

    GuardarModal() {
        console.log('Libro guardado');
    }


    Guardar(datos: Record<string, TipoDato>) {
        this.librosService.CrearLibro(datos).subscribe({
            next: (res) => {
                console.log('Libro creado', res)
                this.cargarDatos()
                this.modalAbierto = false
            },
            error: (err: string) => {
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
          
            next: (res) => { 

                console.log('Libro editado', res)

                this.cargarDatos() 

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


    onFiltrar(valor: string) { 
        this.filtroSeleccionado = valor 
    }


    datosTablaArray: FilaTabla[] = []

    get EjPaginado(): FilaTabla[] { 
        const indice = (this.paginaActual - 1) * 10; 
        return this.datosTablaArray.slice(indice, indice + 10); 
    }

}











