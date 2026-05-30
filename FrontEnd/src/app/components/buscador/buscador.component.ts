import { Component, EventEmitter, input, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-buscador',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './buscador.component.html',
    styleUrl: './buscador.component.css',
})

export class BuscadorComponente {
    @Input() placeholder: string = 'Buscar...' // recibe texto placeholder desde el componente padre
    @Output() valorChange = new EventEmitter<string>() // evento que envia al padre, tipo de dato string

    valor: string = '' // valor actual del input

    buscar() {
        this.valorChange.emit(this.valor) // cada cambio lo manda al componente padre
    }

}