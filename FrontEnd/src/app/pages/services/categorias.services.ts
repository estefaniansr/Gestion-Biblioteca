import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria.interface';
import { TipoDato } from '../../models/TipoDato.type';
@Injectable({
    providedIn: 'root' // el servicio esta disponible globalmente
})
export class CategoriasService {

    private apiUrl = 'http://127.0.0.1:3000/categorias'; // url del back

    constructor(private http: HttpClient) { }  // inyecta HttpClient para realizar peticiones HTTP al back

    public ObtenerCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.apiUrl);
    }
public crearCategorias (datos: Record<string,TipoDato>) {
    return this.http.post(this.apiUrl,datos)
} 
public editarCategorias(id:string, datos : Record <string,TipoDato>){
        return this.http.put(`${this.apiUrl}/${id}`,datos)
}
public buscarCategorias(input: string){
     return this.http.get<Categoria[]>(`${this.apiUrl}/buscar`,{
 params: { input }
     });
}
}