import { Component, Input, Output, EventEmitter } from '@angular/core'

import { Route } from '@angular/router'

@Component({
    selector: 'app-header', // nombre de la etiqueta html <app-header />
    standalone: true, // no necesita declarse
    templateUrl: './header.component.html', // html que contiene la vista
    styleUrl: './header.component.css' // css que tiene el estilo
})

export class headerComponente { // clase principal
    @Input() activo: string = '' // permite recibir datos desde el componente padre
    @Output() cambioTab = new EventEmitter<string>() // emite al padre el tab seleccionado
    oscuro: boolean = false // tema actual

    cambiarTema() { // funcion
        this.oscuro = !this.oscuro // cambia de true a false

        document.body.classList.toggle('dark') // agrega la clase dark
    }


    seleccionarTab(tab: string) { // seleccionar tab, es un string
        this.cambioTab.emit(tab) // envia al padre el tab que el user selecciono
    }
}