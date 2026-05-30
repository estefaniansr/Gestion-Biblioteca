import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-boton',
    standalone: true, //  componente independiente
    templateUrl: './boton.component.html',
    styleUrl: './boton.component.css'
})

export class BotonComponente {
    @Input() texto: string = '+ Nuevo' // texto que viene del padre
    @Output() abrir = new EventEmitter<void>() // evento que se envia al padre, void -> no devuelve ningun valor

    abrirModal() {
        this.abrir.emit() // emite el evento abrir linea 12
    }
}
