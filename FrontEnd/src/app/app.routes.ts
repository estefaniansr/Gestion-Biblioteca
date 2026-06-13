
import { Routes } from '@angular/router';
import { LibrosPages } from './pages/libros/libros.pages';
// import { UsuariosPages } from './pages/usuarios/usuarios.pages';
// import { PrestamosPages } from './pages/prestamos/prestamos.pages';

export const routes: Routes = [
    {
        path: 'libros', // url
        loadComponent: () =>  // carga el componente cuando entra a la ruta
            import('./pages/libros/libros.pages')// importa el archivo
                .then(m => m.LibrosPages) // obtiene y devuelve el componente 
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
        path: '**', // si es != a algun componente redirecciona
        redirectTo: 'libros', // redirecciona a libros
    }
];