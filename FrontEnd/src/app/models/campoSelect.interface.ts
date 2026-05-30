import { TipoDato } from "./TipoDato";
export interface CampoSelect {
    tipo: 'select';
    nombre: string;
    label: string;
    opciones: { valor: TipoDato; texto: string }[];
    requerido?: boolean;
}