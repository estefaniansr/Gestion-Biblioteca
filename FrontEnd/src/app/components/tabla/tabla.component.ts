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

    // columnas que se renderizan en la tabla (
    @Input() columnas: columnaTabla[] = [];

    // datos de la tabla)
    @Input() datos: FilaTabla[] = [];

    // controla si se muestra o no el btn de eliminar
    @Input() mostrarEliminar: boolean = false;

    @Input() totalItems: number = 0;

    // cantidad de item que se muestran por pag
    @Input() itemsPorPagina: number = 10;


    @Input() paginaActual: number = 1;

    // emite la fila seleccionada para editar hacia el componente padre
    @Output() editar = new EventEmitter<{
        id: string;
        datos: Record<string, TipoDato>;
    }>();

    // emite la fila seleccionada para eliminar hacia el componente padre
    @Output() eliminar = new EventEmitter<string>();

    // emite el num de pag cuando el usuario cambia de pagina
    @Output() cambioPagina = new EventEmitter<number>();

    // guarda la fila que sta en modo edicion
    filaEditando: FilaTabla | null = null;

    // copia temporal la fila
    editCache: FilaTabla = {};

    // limita la cantidad de columnas visibles en pantalla
    get columnasLimitadas(): columnaTabla[] {
        return this.columnas.slice(0, 10); // slice crea una lista desde 0 hasta 9
    }

    // calcula la cantidad total de pags necesarias para los items
    get totalPaginas(): number {
        return Math.ceil(this.totalItems / this.itemsPorPagina);
        // Math.ceil redondea par arriba
    }

    // genera la lista de paginas a mostrar en la paginacion (con ...)
    get paginas(): (number | string)[] {

        const total = this.totalPaginas;
        const actual = this.paginaActual;

        // si hay menos o 5 pags
        if (total <= 5) {
            return Array.from({ length: total }, (_, i) => i + 1);
            // crea un array del 1 al total
        }

        const pages: (number | string)[] = [1];

        // si la pag actual esta mas q 3, se agrega "..."
        if (actual > 3) pages.push('...');

        // agrega paginas (anterior, actual, siguiente)
        for (let i = Math.max(2, actual - 1); i <= Math.min(total - 1, actual + 1); i++) {
            pages.push(i);
        }

        if (actual < total - 2) pages.push('...'); // si actual es menor de total -2 agrega ...

        // siempre se muestra la ult pag
        pages.push(total);

        return pages;
    }

    // calcula hasta q item se muestra
    get itemsHasta(): number {
        return Math.min(
            this.paginaActual * this.itemsPorPagina,
            this.totalItems
        );
        // evita pasarse del total real de registros
    }

    // activa el modo edición para una fila
    onEditar(item: FilaTabla) {
        this.filaEditando = item;

        // se clona la fila para editar sin modificar la original directamente
        this.editCache = { ...item };
    }

    // cancela la edicion y limpia los datos temporales
    cancelarEdicion() {
        this.filaEditando = null;
        this.editCache = {};
    }

    // guarda los cambios
    guardarEdicion() {

        const index = this.datos.findIndex(d => d === this.filaEditando);

        if (index !== -1) {

            // reemplaza la fila original por la version editada
            this.datos[index] = { ...this.editCache };

            //  crea nuevo array
            this.datos = [...this.datos];
        }

        this.cancelarEdicion();
    }

    onEliminar(item: FilaTabla) {
        this.eliminar.emit(item['_id'] as string);
        /*
         * toma el id desde la fila seleccionada
        * se usa _id porque FilTabla es un objeo dinamico
        */
    }

    // navega a una pagina especifica y valida que no sea la actual y que sea number
    irPagina(p: number | string) {
        if (typeof p === 'number' && p !== this.paginaActual) {
            this.cambioPagina.emit(p);
        }
    }

    // navega a la pag anterior si no estas en la primera
    anterior() {
        if (this.paginaActual > 1) {
            this.cambioPagina.emit(this.paginaActual - 1);
        }
    }

    // navega a la pag siguiente si no estás en la ult
    siguiente() {
        if (this.paginaActual < this.totalPaginas) {
            this.cambioPagina.emit(this.paginaActual + 1);
        }
    }
}