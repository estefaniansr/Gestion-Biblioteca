
import { Routes } from '@angular/router';
import { LibrosPages } from './pages/libros/libros.pages';
import { UsuariosPages } from './pages/usuarios/usuarios.pages';
import { PrestamosPages } from './pages/prestamos/prestamos.pages';
import { CategoriasPages } from './pages/categorias/categorias.pages';

export const routes: Routes = [
    {
        path: 'libros',
        component: LibrosPages
    },
    {
        path: 'usuarios',
        component: UsuariosPages
    },
    {
        path: 'prestamos',
        component: PrestamosPages
    },
    {
        path: 'categorias',
        component: CategoriasPages
    },
    {
        path: '**',
        redirectTo: 'libros',
    }
];
