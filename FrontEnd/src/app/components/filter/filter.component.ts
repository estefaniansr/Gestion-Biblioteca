import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';

@Component({
    selector: 'app-filter',
    standalone: true,
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.css'
})
export class FilterComponent {

    @Input() opciones: string[] = []  // lista de opciones que manda el padre
    openSelect: Record<string, boolean> = {}; // almacena el estado del select, abierto o cerrado, true o false


    @Output() seleccionar = new EventEmitter<string>()
    // emite la opción elegida al padre
    
    abierto = false
    // controla el selects

    toggle() { // abre o cierra el select
        this.abierto = !this.abierto
    }

    elegir(opcion: string) { // envia la opcion elegida al padre y cierra el selec
        this.seleccionar.emit(opcion) // envia
        this.abierto = false // cierra
    }

    @HostListener('document:click', ['$event'])// escucha los clicks de todo el documento, $event objeto que genera el navegador al hacer click
    onClickAfuera(evento: MouseEvent) { // metodo clickafuera que toma el valor de MouseEvent, es un tipo de TS que representa un valor generado por el mouse
        const target = evento.target as HTMLElement; // elemento donde hizo click el usuario, lo trae de html
        if (!target.closest('.filter')) {  // si el click fue fuera del select
            this.abierto = false; // cierra 
        }
    }

    @HostListener('document:keydown.escape') // escucha en todo el documento la letra esc
    cerrarConEsc() {
        this.abierto = false // cierra
    }
}