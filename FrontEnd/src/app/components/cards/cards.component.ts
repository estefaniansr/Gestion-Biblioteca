import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Campo } from '../../models/campo.type';
import { TipoDato } from '../../models/TipoDato.type';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [ModalComponent],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css',
})
export class CardComponent {
    @Input() titulo: string = '';
    @Input() cantLibros: number = 0;
    @Input() campos: Campo[] = [];

    @Output() editar = new EventEmitter<Record<string, any>>();

    @Output() eliminar = new EventEmitter<void>(); 

    modalAbierto = false; 
    valores: Record<string, TipoDato> = {}; 

    abrirModal(): void {
        this.valores = {
            titulo: this.titulo
        };

        this.campos.forEach(c => {
            if (!(c.nombre in this.valores)) { 
                this.valores[c.nombre] = '';
            }
        });

        this.modalAbierto = true;
    }
    cerrarModal(): void { 
        this.modalAbierto = false; 
    }

    confirmar(valores: Record<string, TipoDato>): void {  
        this.editar.emit(valores);  
        this.cerrarModal();
    }

    onEliminar(): void {
        this.eliminar.emit(); 
    }

    // escucha la tecla Escape en todo el documento
    @HostListener('document:keydown.escape')
    onEsc(): void {
        if (this.modalAbierto) this.cerrarModal();
    }
    
    esSelect(campo: Campo): boolean {
        return campo.tipo === 'select'; 
    }
}