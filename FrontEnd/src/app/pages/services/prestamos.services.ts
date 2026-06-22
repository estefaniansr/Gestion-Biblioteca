import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../../models/categorias.interface';

@Injectable({
    providedIn: 'root' // el servicio esta disponible globalmente
})
export class PrestamosService {

    private apiUrl = 'http://127.0.0.1:3000/prestamos'; // url del back

    constructor(private http: HttpClient) { }  // inyecta HttpClient para realizar peticiones HTTP al back

    public ObtenerPrestamos(): Observable<Prestamo[]> {
        return this.http.get<Prestamo[]>(this.apiUrl);
    }

}