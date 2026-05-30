import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-tags',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tags.component.html',
    styleUrl: './tags.component.css'
})

export class TagComponent {
    @Input() titulo: string = '' // paso el titulo al componente padre
    @Input() cantidad: number = 0 // lo mismo con cantidad
}
