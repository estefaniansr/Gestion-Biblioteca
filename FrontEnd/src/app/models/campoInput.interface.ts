
export interface CampoInput {
    tipo: 'text' | 'number' | 'email' | 'date' | 'select' | 'tel';
    nombre: string;       
    label: string;      
    placeholder?: string;
    requerido?: boolean;
}