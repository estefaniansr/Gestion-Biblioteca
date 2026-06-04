
import { Routes } from '@angular/router';
import { LibrosPages } from './pages/libros/libros.pages';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
// import { PrestamosPages } from './pages/prestamos/prestamos.pages';

export const routes: Routes = [
    {
        path: 'libros',
        component: LibrosPages
    },
    {
        path: 'usuarios',
        component: UsuariosComponent
        },
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
