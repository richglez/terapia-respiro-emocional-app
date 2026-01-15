import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { PacientesService } from '../../services/pacientes.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Cuidador } from '../../models/cuidadores';
import { Paciente } from '../../models/pacientes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nueva-suplencia-dialog',
  templateUrl: './nueva-suplencia-dialog.component.html',
  styleUrls: ['./nueva-suplencia-dialog.component.scss'],
})
export class NuevaSuplenciaDialogComponent implements OnInit {
  public filteredPacientes: Paciente[] = [];
  public cuidadores: Cuidador[] = [];
  public pacientes: Paciente[] = [];

  @ViewChild('suplenciaForm') suplenciaForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<NuevaSuplenciaDialogComponent>,
    public cuidadoresService: CuidadoresServiceService,
    public pacientesService: PacientesService,
    public suplenciasService: SuplenciasServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cuidadoresService.getCuidadores().subscribe(
      (cuidadores) => {
        this.cuidadores = cuidadores;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onChangeCuidador() {
    const selectedCuidadorId =
      this.suplenciasService.selectedSuplencia.id_cuidador_paciente;
    if (selectedCuidadorId !== undefined) {
      this.pacientesService.getPacienteByCuidador(selectedCuidadorId).subscribe(
        (pacientes) => {
          this.filteredPacientes = pacientes;
          this.suplenciasService.selectedSuplencia.id_paciente =
            this.filteredPacientes[0]?.id_paciente || 0; // Establecer el primer paciente como predeterminado
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  //Cuando guardes una suplencia, verifica si concurrencia_anual es "SI". Si es así, crea eventos recurrentes para los siguientes años. Aquí tienes un ejemplo básico de cómo podrías hacerlo:
  async confirmar() {
    const suplencia = this.suplenciasService.selectedSuplencia;
  
    // Validación de campos obligatorios
    if (!suplencia.id_cuidador_paciente) {
      console.error('Cuidador no seleccionado');
      return;
    }
  
    if (!suplencia.id_paciente) {
      console.error('Paciente no seleccionado');
      return;
    }
  
    try {
      // Llamada para agregar la suplencia original
      const response = await this.suplenciasService.addSuplencia(suplencia).toPromise();
      console.log('Suplencia agregada exitosamente', response);
  
      // Si se repite anualmente, agrega eventos para los próximos 10 años
      if (suplencia.concurrencia_anual === 'ANUAL') {
        for (let i = 1; i <= 10; i++) {
          const nuevaFecha = new Date(suplencia.dia_suplencia);
          nuevaFecha.setFullYear(nuevaFecha.getFullYear() + i);
  
          const suplenciaRecurrente = { ...suplencia, dia_suplencia: nuevaFecha.toISOString().split('T')[0] };
  
          const responseRec = await this.suplenciasService.addSuplencia(suplenciaRecurrente).toPromise();
          console.log(`Suplencia recurrente ${i} agregada exitosamente`, responseRec);
        }
      }
  
      // Si se repite mensualmente, agrega eventos para los próximos 12 meses
      if (suplencia.concurrencia_anual === 'MENSUAL') {
        for (let i = 1; i <= 12; i++) {
          const nuevaFecha = new Date(suplencia.dia_suplencia);
          nuevaFecha.setMonth(nuevaFecha.getMonth() + i);
  
          const suplenciaRecurrente = { ...suplencia, dia_suplencia: nuevaFecha.toISOString().split('T')[0] };
  
          const responseRec = await this.suplenciasService.addSuplencia(suplenciaRecurrente).toPromise();
          console.log(`Suplencia mensual ${i} agregada exitosamente`, responseRec);
        }
      }
  
      // Si se repite semanalmente, agrega eventos para las próximas 52 semanas
      if (suplencia.concurrencia_anual === 'SEMANALMENTE') {
        for (let i = 1; i <= 52; i++) {
          const nuevaFecha = new Date(suplencia.dia_suplencia);
          nuevaFecha.setDate(nuevaFecha.getDate() + (i * 7));
  
          const suplenciaRecurrente = { ...suplencia, dia_suplencia: nuevaFecha.toISOString().split('T')[0] };
  
          const responseRec = await this.suplenciasService.addSuplencia(suplenciaRecurrente).toPromise();
          console.log(`Suplencia semanal ${i} agregada exitosamente`, responseRec);
        }
      }
  
      // Si se repite cada 2 semanas, agrega eventos para las próximas 26 quincenas
      if (suplencia.concurrencia_anual === '2SEMANAS') {
        for (let i = 1; i <= 26; i++) {
          const nuevaFecha = new Date(suplencia.dia_suplencia);
          nuevaFecha.setDate(nuevaFecha.getDate() + (i * 14));
  
          const suplenciaRecurrente = { ...suplencia, dia_suplencia: nuevaFecha.toISOString().split('T')[0] };
  
          const responseRec = await this.suplenciasService.addSuplencia(suplenciaRecurrente).toPromise();
          console.log(`Suplencia cada 2 semanas ${i} agregada exitosamente`, responseRec);
        }
      }
  
      // Si se repite diariamente, agrega eventos para todos los días del año
      if (suplencia.concurrencia_anual === 'DIARIAMENTE') {
        for (let i = 1; i <= 365; i++) {
          const nuevaFecha = new Date(suplencia.dia_suplencia);
          nuevaFecha.setDate(nuevaFecha.getDate() + i);
  
          const suplenciaRecurrente = { ...suplencia, dia_suplencia: nuevaFecha.toISOString().split('T')[0] };
  
          const responseRec = await this.suplenciasService.addSuplencia(suplenciaRecurrente).toPromise();
          console.log(`Suplencia diaria ${i} agregada exitosamente`, responseRec);
        }
      }
  
      // Mostrar mensaje de éxito
      this.snackBar.open('¡Suplencia agregada exitosamente!', 'Cerrar', {
        duration: 4000,
        panelClass: ['main-snackbar'],
      });
  
      // Reiniciar el formulario
      this.resetForm();
  
    } catch (error) {
      console.error('Error al agregar suplencia', error);
      // Mostrar mensaje de error si falla la operación principal
      this.snackBar.open('Error al agregar suplencia. Inténtalo de nuevo más tarde.', 'Cerrar', {
        duration: 4000,
        panelClass: ['error-snackbar'],
      });
    }
  }
  
  


  resetForm() {
    this.suplenciasService.selectedSuplencia = {
      id_cuidador_paciente: 0,
      dia_suplencia: '',
      hora_inicial: '',
      hora_final: '',
      costoGuardia: 0,
      particular: '',
      concurrencia_anual: '',
      id_paciente: 0,
    };
    this.suplenciaForm.resetForm();
  }
}
