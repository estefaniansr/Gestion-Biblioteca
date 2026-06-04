
import { Routes } from '@angular/router';
import { LibrosPages } from './pages/libros/libros.pages';
// import { UsuariosPages } from './pages/usuarios/usuarios.pages';
// import { PrestamosPages } from './pages/prestamos/prestamos.pages';

export const routes: Routes = [
    {
        path: 'libros',
        component: LibrosPages
    },
    // {
    //     path: 'usuarios',
    //     component: UsuariosPages
    // },
    // {
    //     path: 'prestamos',
    //     component: PrestamosPages
    // },
    {
        path: '',
        redirectTo: 'libros',
        pathMatch: 'full'
    }
];
