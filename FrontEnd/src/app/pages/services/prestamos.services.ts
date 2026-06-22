import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../../models/categorias.interface';

@Injectable({
    providedIn: 'root' 
})
export class PrestamosService {

    private apiUrl = 'http://127.0.0.1:3000/prestamos'; 

    constructor(private http: HttpClient) { } 

    public ObtenerPrestamos(): Observable<Prestamo[]> {
        return this.http.get<Prestamo[]>(this.apiUrl);
    }

}