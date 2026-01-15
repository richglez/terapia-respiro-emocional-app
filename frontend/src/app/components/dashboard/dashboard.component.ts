import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { CuidadoresServiceService } from '../../services/cuidadores-service.service';
import { SuplenciasServiceService } from '../../services/suplencias-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalPacientes: number = 0;
  totalCuidadores: number = 0;
  totalSuplencias: number = 0;
  totalPacientesMenores: number = 0;
  totalPacientesMayores: number = 0;
  totalCECPAM: number = 0;
  fechaHoy: string = '';
  horaHoy: string = '';
  proximasSuplencias: any[] = [];

  constructor(
    private pacientesService: PacientesService,
    private cuidadoresService: CuidadoresServiceService,
    private suplenciasService: SuplenciasServiceService
  ) {}

  ngOnInit(): void {
    this.pacientesService.getTotalPacientes().subscribe((data) => (this.totalPacientes = data));
    this.cuidadoresService.getTotalCuidadores().subscribe((data) => (this.totalCuidadores = data));
    this.suplenciasService.getTotalSuplencias().subscribe((data) => (this.totalSuplencias = data));
    this.pacientesService.getTotalPacientesMenores().subscribe((data) => (this.totalPacientesMenores = data));
    this.pacientesService.getTotalPacientesMayores().subscribe((data) => (this.totalPacientesMayores = data));
    this.pacientesService.getTotalProgramasCECPAM().subscribe((data) => (this.totalCECPAM = data));

    const now = new Date();
    this.fechaHoy = now.toLocaleDateString();
    this.horaHoy = now.toLocaleTimeString();

    // Obtener las próximas 6 suplencias registradas sin importar la semana, mes o año
    this.suplenciasService.getProximasSuplencias().subscribe((data) => {
      const suplencias = data.map(suplencia => ({
        ...suplencia,
        dia_semana: new Date(suplencia.dia_suplencia).toLocaleString('es-ES', { weekday: 'long' }),
        dia: new Date(suplencia.dia_suplencia).getDate(),
        mes: new Date(suplencia.dia_suplencia).toLocaleString('es-ES', { month: 'long' }),
        nombreCompletoPaciente: `${suplencia.nombre_paciente} ${suplencia.paciente_apellido_paterno} ${suplencia.paciente_apellido_materno}`,
        nombreCompletoCuidador: `${suplencia.nombreCuidador} ${suplencia.apPatCuidador} ${suplencia.apMatCuidador}`
      }));

      this.proximasSuplencias = suplencias.slice(0, 11);
    });
  }


  
}
