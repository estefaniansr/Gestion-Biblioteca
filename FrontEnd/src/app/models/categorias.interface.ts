export interface Prestamo {
    _id: string;
    usuarioId: string,
    libroId: string;
    fechaPrestamo: string;
    fechaVencimiento: string;
    estado: string;
}
