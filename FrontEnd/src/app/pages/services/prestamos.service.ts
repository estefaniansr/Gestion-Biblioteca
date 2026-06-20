import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../../models/prestamo.interface';
import { EstadisticasPrestamos } from '../../models/estadisticasPrestamos.interface';

@Injectable({
    providedIn: 'root'
})
export class PrestamosService {

    private apiUrl = 'http://localhost:3000/prestamos';

    constructor(private http: HttpClient) { }

    ObtenerPrestamos(): Observable<Prestamo[]> {
        return this.http.get<Prestamo[]>(this.apiUrl);
    }

    ObtenerEstadisticas(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/estadisticas`);
    }

    CrearPrestamo(usuarioId: string, libroId: string) {
        return this.http.post(this.apiUrl, { usuarioId, libroId });
    }

    DevolverPrestamo(id: string) {
        return this.http.patch(`${this.apiUrl}/${id}`, {});
    }

    EliminarPrestamo(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
