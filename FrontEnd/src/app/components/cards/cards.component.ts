import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Campo } from '../../models/campo.type';
import { TipoDato } from '../../models/TipoDato.type';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [ModalComponent], // usas componentes dentro del componente modal.component
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css',
})
export class CardComponent {
    @Input() titulo: string = ''; // texto que se mostrada en la card
    @Input() cantLibros: number = 0; // cant de libros que se mostrada en la card
    @Input() campos: Campo[] = []; // campos que se mostran dentro del modal de edicion, campo es la interfaz, cada campo puede ser input o select 

    @Output() editar = new EventEmitter<Record<string, any>>(); // evento que envia los datos editados al componente padre, record es un tipo generico de TS que representa un objeto con clave y valor, la key es un string y un any, any porque puede recibir string, number o boolean
    // @Output() editar = new EventEmitter<Record<string, string | number | boolean>>(); aca obliga a que sea string o numero o buleano, las dos formas son correctas
    // @Output() editar = new EventEmitter<Record<string, TipoDato>(); aca obliga a que sea string o numero o buleano, las dos formas son correctas

    @Output() eliminar = new EventEmitter<void>(); // evento eliminar la card, tipo de dato void, no devuelve nada

    modalAbierto = false; // controla si el modal esta abierto o cerrado
    valores: Record<string, TipoDato> = {}; // almacena los valores que se editan en el modal, key string y el valor del tipo TipoDato, sino puede ser any

    abrirModal(): void { // abre el modal y carga los valores inciales -> void
        this.valores = { // cargar los valores, linea 24
            titulo: this.titulo // valor titulo, this linea 13
        };

        this.campos.forEach(c => { // recorre el array que campos, que es el tipo de dato campo (2 interfaces, una o otra)
            if (!(c.nombre in this.valores)) { // si c.nombre (la interfaces campo tiene nombre) no esta en valores (linea, 24)
                this.valores[c.nombre] = ''; //  arega o modifica el nombre de la interfaces
            }
        });

        this.modalAbierto = true; // y abre el modal
    }
    cerrarModal(): void { // funcion cerrar modal, no devuelve nada
        this.modalAbierto = false; // modal abierto es falso
    }

    confirmar(valores: Record<string, TipoDato>): void { // confirmar, devuelve una clave string un valor de la interfaz 
        this.editar.emit(valores);  // emite el evento editar linea 17, y envia los valores al padre
        this.cerrarModal();
    }

    onEliminar(): void { // no deuvelve dato
        this.eliminar.emit(); // emite el evento eliminar, linea 21
    }

    // escucha la tecla Escape en todo el documento
    @HostListener('document:keydown.escape')
    onEsc(): void { // metodo que que se ejecuta al tocar esc
        if (this.modalAbierto) this.cerrarModal(); // si modal esta abierto que cierre
    }
    // verifica si un campo es de tipo select
    esSelect(campo: Campo): boolean {// pasa como parametro campo, linea 15 y devuelve un boolean
        return campo.tipo === 'select'; // confirma si campo.tipo (valor dentro de la interfaz) es de tipo select
    }
}