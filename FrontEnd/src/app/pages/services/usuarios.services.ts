import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDato } from '../../models/TipoDato.type';
import { Usuario } from '../../models/usuarios.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    private apiUrl = 'http://127.0.0.1:3000/usuarios';

    constructor(private http: HttpClient) { }

    public obtenerUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    public usuarioBusqueda(input: string): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.apiUrl}/buscar/${input}`);
    }

    public crearUsuario(
        pNombre: string,
        pApellido: string,
        pDNI: string | number,
        pEmail: string,
        pTelefono: string | number
    ) {
        return this.http.post(this.apiUrl, {
            nombre: pNombre,
            apellido: pApellido,
            DNI: Number(pDNI),
            email: pEmail,
            telefono: Number(pTelefono)
        });
    }

    public editarUsuario(id: string, datos: Record<string, TipoDato>) {
        return this.http.put(`${this.apiUrl}/${id}`, datos);
    }

    public borrarUsuario(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}