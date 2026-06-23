import { Component, OnInit } from "@angular/core";



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
import { CampoSelect } from "../../models/campoSelect.interface";
import { Categoria } from "../../models/categoria.interface";

import { LibrosService } from "../services/libros.services";
import { CategoriasService } from "../services/categorias.services";
import { PrestamosService } from "../services/prestamos.services";
@Component({
    selector: 'app-libros',
    standalone: true,
    imports: [headerComponente, BuscadorComponente, BotonComponente, TituloComponent, TagComponent, TablaComponent, ModalComponent], 
    templateUrl: './categorias.pages.html',
    styleUrl: './categorias.pages.css'
})

export class CategoriasPages implements OnInit {
    columnas = [
        {
            key: 'nombre',
            label: 'Categoría'
        },
        {
            key:'descripcion',
            label: 'Descripcion'
        }
    ]
    activo='categorias'
    paginaActual = 1
    cantidadTotal= 0
        modalAbierto = false
    CamposModal: Campo[] = [
        {
            tipo: 'text',
            nombre: 'nombre',
            label: 'Categoría',
            placeholder: 'Novela',
            requerido: true
        },
        {
             tipo: 'text',
        nombre: 'descripcion',
        label: 'Descripción',
        placeholder: 'Libros de ficción',
        requerido: false
        }
    ]

    constructor(private librosService: LibrosService, private categoriasService: CategoriasService, private prestamosService: PrestamosService) { } 
    private convertirAFilaTabla(categorias: Categoria[]): 
    FilaTabla[] 
     {
    return categorias.map(categoria => ({ 
        _id: categoria._id,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion ?? '' 
    })); 
}
cargarDatos() {
    this.categoriasService.ObtenerCategorias().subscribe({
        next: (categorias) => {
            this.datosTablaArray = this.convertirAFilaTabla(categorias);
            this.cantidadTotal=categorias.length
        },
        error: (error) => {
            console.error(error);
        }
    });
}
guardar(datos: Record<string,TipoDato>){
    this.categoriasService.crearCategorias(datos).subscribe({
        next:()=>{
            this.cargarDatos();
            this.modalAbierto=false
        },error:(error)=>{
            console.log(error)
        }
    })
}
editar(id:string,datos:Record<string,TipoDato>){
    this.categoriasService.editarCategorias(id,datos).subscribe({
        next:()=>this.cargarDatos(),
        error: error=>console.log(error)
        
    })
}
buscar(input: string) {
    console.log(input)
    this.categoriasService.buscarCategorias(input).subscribe({
        next: (res) => {
           this.datosTablaArray = this.convertirAFilaTabla(res);
        },
        error: (err) => {
            console.error(err);
        }
    });
}
    ngOnInit() {
        this.cargarDatos()
    }
    datosTablaArray: FilaTabla[] = []
    get EjPaginado(): FilaTabla[] {
    const indice = (this.paginaActual - 1) * 10;
    return this.datosTablaArray.slice(indice, indice + 10);
}

}