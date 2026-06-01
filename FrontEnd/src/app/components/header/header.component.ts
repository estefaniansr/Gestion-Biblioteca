import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header', // nombre de la etiqueta html <app-header />
    standalone: true, // no necesita declarse
    templateUrl: './header.component.html', // html que contiene la vista
    imports: [RouterLink],
    styleUrl: './header.component.css' // css que tiene el estilo
})

export class headerComponente { // clase principal
    @Input() activo: string = '' // permite recibir datos desde el componente padre
    oscuro: boolean = false // tema actual

    // Inyeccion del servicio Router para navegar entre páginas
    constructor(private router: Router) { }

    cambiarTema() { // funcion
        this.oscuro = !this.oscuro // cambia de true a false

        document.body.classList.toggle('dark') // agrega la clase dark
    }


    seleccionarTab(tab: string) { // seleccionar tab, es un string
        this.router.navigate([tab]) // Navega hacia la ruta indicada
    }
}