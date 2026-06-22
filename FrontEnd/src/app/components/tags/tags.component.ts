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
    @Input() titulo: string = '' 
    @Input() cantidad: number = 0 
}
