
export interface CampoInput {
    tipo: 'text' | 'number' | 'email' | 'date' | 'tel';
    nombre: string;
    label: string;
    placeholder?: string;
    requerido?: boolean;
}