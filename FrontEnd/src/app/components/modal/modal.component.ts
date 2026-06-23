import { Component, EventEmitter, Input, OnChanges, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampoInput } from '../../models/campoInput.interface';
import { CampoSelect } from '../../models/campoSelect.interface';
import { Campo } from '../../models/campo.type';
import { TipoDato } from '../../models/TipoDato.type';


@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges { // implmenta OnChanges para detectar cambios en @Input
    @Input() titulo: string = 'Titulo'; // titulo que se muestra y pasame el padre
    @Input() abierto: boolean = false; // controla si el modal esta abierto o cerrado
    @Input() campos: Campo[] = []; // campos de la interfaz Campo

    @Input() mensaje = ''; //mensaje opcional por si se requiere mostrar algo diferente

    @Output() guardar = new EventEmitter<Record<string, TipoDato>>(); // envia al componente padre un evento que envia los datos del form
    @Output() cancelar = new EventEmitter<void>(); // manda al padre que cancelo

    valores: Record<string, TipoDato> = {}; // almacena los valores ingresados

    ngOnChanges() { // se ejecuta automaticamente cuando cambia un @Input
        // bloquea o habilita el scroll del body según el estado del modal
        // si el modal está abierto, el fondo no se puede mover
        if (this.abierto) {
            document.body.style.overflow = 'hidden';
        } else {
            // si el modal está cerrado, se restaura el scroll normal
            document.body.style.overflow = '';
        }

        // se ejecuta cuando cambia algún @Input (campos, abierto, etc.)
        // si hay campos configurados, reinicia el formulario
        if (this.campos.length) {
            // crea un objeto donde cada campo empieza vacío
            // usa el nombre del campo como clave
            this.valores = Object.fromEntries(
                this.campos.map(c => [c.nombre, ''])
            );
        }
    }

    valido(): boolean {
        return this.campos.some(c => { // some devuelve true o false y recorre todo
            const valor = this.valores[c.nombre] // obtiene el valor ingresado por el usuario en el campo nombre
            return c.requerido && (valor === null || valor === undefined || valor === '')// devuelve true si esta vacio y es requerido
        })
    }


    cerrar() {
        this.cancelar.emit(); // cierra el modal enviando el evento al padre
    }

    @HostListener('document:keydown.escape') // escucha la letra esc de todo el documento
    onEsc() {
        if (this.abierto) this.cancelar.emit(); // si esta abierto emite el evento cancelar
    }

    confirmar() {
        this.guardar.emit(this.valores)
    }

    esSelect(campo: Campo): campo is CampoSelect {
        // pasa como parametro campo y devuelve los campos en campoSelect
        return campo.tipo === 'select';  // confirma si campo.tipo (valor dentro de la interfaz) es de tipo select
    }
}

