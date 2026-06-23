import { Routes } from '@angular/router';
import { LibrosPages } from './FrontEnd/src/app/pages/libros/libros.pages';
import { UsuariosPages } from './FrontEnd/src/app/pages/usuarios/usuarios.pages';
import { PrestamosPages } from './FrontEnd/src/app/pages/prestamos/prestamos.pages';
import { CategoriasPages } from './FrontEnd/src/app/pages/categorias/categorias.pages';

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
