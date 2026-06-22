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
export class ModalComponent implements OnChanges {
    @Input() titulo: string = 'Titulo'; 
    @Input() abierto: boolean = false; 
    @Input() campos: Campo[] = []; 

    @Output() guardar = new EventEmitter<Record<string, TipoDato>>();
    @Output() cancelar = new EventEmitter<void>();

    valores: Record<string, TipoDato> = {};

    ngOnChanges() { // se ejecuta automaticamente cuando cambia un @Input
        if (this.abierto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        if (this.campos.length) {
            this.valores = Object.fromEntries( // fromEntries convierte un Record (clave,valor) a un objeto
                this.campos.map(c => [c.nombre, '']) // recorre todos los elementos y por c uno devuelve un array con 2 posiciones
            );
        }
    }

    valido(): boolean {
        return this.campos.some(c => { // some devuelve true o false y recorre todo
            const valor = this.valores[c.nombre]
            return c.requerido && (valor === null || valor === undefined || valor === '')
            // devuelve true si esta vacio y es requerido
        })
    }


    cerrar() {
        this.cancelar.emit(); 
    }

    @HostListener('document:keydown.escape') 
    onEsc() {
        if (this.abierto) this.cancelar.emit();
    }

    confirmar() {
        console.log("Datos guardados")
        this.guardar.emit(this.valores)
    }

    esSelect(campo: Campo): campo is CampoSelect {
        return campo.tipo === 'select';
    }
}

