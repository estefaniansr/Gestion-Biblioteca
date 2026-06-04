import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoDato } from '../../models/TipoDato.type';

@Injectable({
    providedIn: 'root'
})
export class LibrosService {

    // private apiUrl = 'http://localhost:3000/libros';

    constructor(private http: HttpClient) { }  // inyecta HttpClient para realizar peticiones HTTP al back

    ObtenerLibros() { // GET -> obtiene todos los libros
        // return this.http.get(this.apiUrl);
        return console.log("Obteniendo libros")
    }

    ObtenerLibro(id: string) { // GET -> obtiene un libro por id 
        // return this.http.get(`${this.apiUrl}/${id}`);
        return console.log(`Obteniendo datos del libro id ${id}`)
    }

    CrearLibro(datos: Record<string, TipoDato>) { // POST -> crea un nuevo libro
        // return this.http.post(this.apiUrl, datos);
        return console.log("Creando libros", datos)
    }

    editarLibro(id: string, datos: Record<string, TipoDato>) {// PUT -> actualiza un libro existente
        // return this.http.put(`${this.apiUrl}/${id}`, datos);
        return console.log(`Actualizando datos del libro id ${id}`)
    }

    editarLibroEspecifico(id: string, datos: Record<string, TipoDato>) { // PATCH -> modifica algunos campos
        // return this.http.patch(`${this.apiUrl}/${id}`, datos);
        return console.log("Modificando datos")
    }

    EliminarLibro(id: string) { // DELETE -> elimina un libro
        // return this.http.delete(`${this.apiUrl}/${id}`);
        return console.log(`Eliminado el libro id ${id}`)
    }
}