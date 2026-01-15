export interface Cuidador {
  id_cuidador_paciente?: number;
  nombreCuidador: string;
  apPatCuidador: string;
  apMatCuidador: string;
  sexoCuidador: string;
  edadCuidador: number;
  telefonoCuidador: string;
  num_suplencias: number; // Campo para el total de suplencias
  ultima_modificacion: string;
  ingreso_programa: string;
}
