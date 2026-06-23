import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    imports: [RouterLink],
    styleUrl: './header.component.css'
})

export class headerComponente {
    @Input() activo: string = ''
    oscuro: boolean = false

    
    constructor(private router: Router) { }

    cambiarTema() {
        this.oscuro = !this.oscuro

        document.body.classList.toggle('dark')
    }


    seleccionarTab(tab: string) {
        this.router.navigate([tab])
    }
}