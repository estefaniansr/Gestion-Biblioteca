import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoDato } from '../../models/TipoDato.type';
import { Observable } from 'rxjs';
import { FilaTabla } from '../../models/filaTabla.type';

@Injectable({
    providedIn: 'root' // el servicio esta disponible globalmente
})
export class LibrosService {

    private apiUrl = 'http://127.0.0.1:3000/libros'; // url del back

    constructor(private http: HttpClient) { }  // inyecta HttpClient para realizar peticiones HTTP al back

    public ObtenerLibros(): Observable<FilaTabla[]> {
        /*
        * Observable -> flujo de datos asincronicos
        * filaTabla[] -> devuelve un array de filas
         */

        return this.http.get<FilaTabla[]>(this.apiUrl);

    }
    public buscarLibro(input: string) {
        return this.http.get<FilaTabla[]>(`${this.apiUrl}/buscar`, {
            params: { input } // convierte el input en query string
        });
    }

    public CrearLibro(datos: Record<string, TipoDato>) { // POST -> crea un nuevo libro
        return this.http.post(this.apiUrl, datos);
    }

    public editarLibro(id: string, datos: Record<string, TipoDato>) {

        return this.http.put(`${this.apiUrl}/${id}`, datos)
        /**
         * hace una peticion put al back
         * put actualiza los recursos
         */
    }


    public EliminarLibro(id: string) { // DELETE -> elimina un libro
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}