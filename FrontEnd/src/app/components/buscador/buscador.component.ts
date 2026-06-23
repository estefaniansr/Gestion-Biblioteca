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
    @Input() placeholder: string = 'Buscar...'
    @Output() valorChange = new EventEmitter<string>()

    valor: string = ''

    buscar() {
        this.valorChange.emit(this.valor)
    }

}