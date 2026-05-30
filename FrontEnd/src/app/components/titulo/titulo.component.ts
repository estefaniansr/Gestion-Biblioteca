import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-titulo',
    standalone: true,
    templateUrl: './titulo.component.html',
    styleUrl: './titulo.component.css',
})

export class TituloComponent {
    @Input() titulo: string = ''// paso el titulo al componente padre
    @Input() subtitulo: string = ''// paso el subtitulo al componente padre

}