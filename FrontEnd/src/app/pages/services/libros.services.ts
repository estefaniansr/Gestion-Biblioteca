import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoDato } from '../../models/TipoDato.type';
import { Observable } from 'rxjs';
import { FilaTabla } from '../../models/filaTabla.type';

@Injectable({
    providedIn: 'root' 
})
export class LibrosService {

    private apiUrl = 'http://127.0.0.1:3000/libros';

    constructor(private http: HttpClient) { }  // inyecta HttpClient para realizar peticiones HTTP al back

    public ObtenerLibros(): Observable<FilaTabla[]> {
        return this.http.get<FilaTabla[]>(this.apiUrl);

    }
    public buscarLibro(input: string) {
        return this.http.get<FilaTabla[]>(`${this.apiUrl}/buscar`, {
            params: { input } 
        });
    }

    public CrearLibro(datos: Record<string, TipoDato>) { 
        return this.http.post(this.apiUrl, datos);
    }

    public editarLibro(id: string, datos: Record<string, TipoDato>) {

        return this.http.put(`${this.apiUrl}/${id}`, datos)
    }


    public EliminarLibro(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}