export interface Usuario {
    [key: string]: any

    _id:string,
    nombre:string,
    apellido: string,
    DNI: number
    email:string,
    telefono: number
}

export interface UsuarioMin {
  _id: string;
  nombre: string;
  apellido: string;
}
