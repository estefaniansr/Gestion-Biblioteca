import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-boton',
    standalone: true,
    templateUrl: './boton.component.html',
    styleUrl: './boton.component.css'
})

export class BotonComponente {
    @Input() texto: string = 'Nuevo'
    @Output() abrir = new EventEmitter<void>()

    abrirModal() {
        this.abrir.emit()
    }
}
