export interface Prestamo {
    _id: string;
    usuarioId: {
        _id: string;
        nombre: string;
        apellido: string;
    };
    libroId: {
        _id: string;
        libro: string;
        autor: string;
    };
    fechaPrestamo: string;
    fechaVencimiento: string;
    fechaDevolucion: string | null;
    estado: 'Activo' | 'Devuelto' | 'Vencido';
}
