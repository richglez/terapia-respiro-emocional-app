// src/app/models/suplencias.ts
export interface Suplencia {
  id_suplencia?: number;
  dia_suplencia: string;
  hora_inicial: string;
  hora_final: string;
  costoGuardia: number;
  particular: string;
  concurrencia_anual: string;
  id_cuidador_paciente: number;
  id_paciente: number;
  nombre_paciente?: string; // Agregados
  paciente_apellido_paterno?: string; // Agregados
  paciente_apellido_materno?: string; // Agregados
  nombreCuidador?: string; // Agregados
  apPatCuidador?: string; // Agregados
  apMatCuidador?: string; // Agregados
}
