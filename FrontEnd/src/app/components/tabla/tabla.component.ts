import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { columnaTabla } from "../../models/columnaTabla.interface";
import { FilaTabla } from "../../models/filaTabla.type";
import { TipoDato } from "../../models/TipoDato.type";


@Component({
    selector: 'app-tabla',
    templateUrl: './tabla.component.html',
    styleUrl: './tabla.component.css',
    imports: [CommonModule, FormsModule]
})

export class TablaComponent {

    @Input() columnas: columnaTabla[] = [];

    @Input() camposBloqueados: string[] = [];

    @Input() datos: FilaTabla[] = [];

    @Input() mostrarEliminar: boolean = false;

    @Input() totalItems: number = 0;

    @Input() itemsPorPagina: number = 10;


    @Input() paginaActual: number = 1;

    @Output() editar = new EventEmitter<{
        id: string;
        datos: Record<string, TipoDato>;
    }>();

    @Output() eliminar = new EventEmitter<string>();

    @Output() cambioPagina = new EventEmitter<number>();

    filaEditando: FilaTabla | null = null;

    filaEditada: FilaTabla = {}


    columnasLimitadas(): columnaTabla[] {
        return this.columnas.slice(0, 10); // copia el lugar del array de la posicion 0 a la 10
    }

    totalPaginas(): number {
        return Math.ceil(this.totalItems / this.itemsPorPagina);
        // Math.ceil redondea par arriba
    }

    paginas(): (number | string)[] {

        const total = this.totalPaginas();
        const actual = this.paginaActual;

        if (total <= 5) {
            return Array.from({ length: total }, (_, i) => i + 1);
            // crea un array del 1 al total
        }

        const pages: (number | string)[] = [1];

        if (actual > 3) pages.push('...');

        for (let i = Math.max(2, actual - 1); i <= Math.min(total - 1, actual + 1); i++) {
            pages.push(i);
        }

        if (actual < total - 2) pages.push('...');

        pages.push(total);

        return pages;
    }

    itemsHasta(): number {
        return Math.min(
            this.paginaActual * this.itemsPorPagina,
            this.totalItems
        );
    }

    onEditar(item: FilaTabla) {
        this.filaEditando = item;


        this.filaEditada = { ...item } // ... trae los items para clonar sin modificar la original
    }

    cancelarEdicion() {
        this.filaEditando = null;

        this.filaEditada = {}
    }

    esCampoBloqueado(campo: string): boolean {
        return this.camposBloqueados.includes(campo);
    }

    guardarEdicion() {
        console.log("clikeo guardar edicion")

        if (!this.filaEditando) {
            console.log("no tiene fila")
            return;
        }
        const id = this.filaEditando['_id'] as string;
        /*
            * obtiene el _id del objeto que esta editando el la filaEditando
            * el as string le dice a ts que el valor sera string
         */
        console.log("ID", id)
        this.editar.emit({ id, datos: this.filaEditando });

        console.log("editar emitido")
        this.cancelarEdicion();
    }

    onEliminar(item: FilaTabla) {
        this.eliminar.emit(item['_id'] as string);
        /*
        * se usa _id porque FilTabla es un objeo dinamico
        */
    }

    irPagina(p: number | string) {
        if (typeof p === 'number' && p !== this.paginaActual) {
            this.cambioPagina.emit(p);
        }
    }

    anterior() {
        if (this.paginaActual > 1) {
            this.cambioPagina.emit(this.paginaActual - 1);
        }
    }

    siguiente() {
        if (this.paginaActual < this.totalPaginas()) {
            this.cambioPagina.emit(this.paginaActual + 1);
        }
    }
}