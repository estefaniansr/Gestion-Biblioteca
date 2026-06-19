import { TipoDato } from "./TipoDato.type";

export interface CampoSelect {
    tipo: 'select';
    nombre: string;
    label: string;
    opciones: { valor: TipoDato; texto: string }[];
    requerido?: boolean;
}   