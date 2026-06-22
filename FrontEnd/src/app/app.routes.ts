
import { Routes } from '@angular/router';
import { LibrosPages } from './pages/libros/libros.pages';
// import { UsuariosPages } from './pages/usuarios/usuarios.pages';
// import { PrestamosPages } from './pages/prestamos/prestamos.pages';

export const routes: Routes = [
    {
        path: 'libros',
        loadComponent: () =>
            import('./pages/libros/libros.pages')
                .then(m => m.LibrosPages)
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
        path: '**',
        redirectTo: 'libros',
    }
];