import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../models/pacientes';
import { Cuidador } from '../models/cuidadores'; // Importar el modelo Cuidador
import { CuidadoresServiceService } from './cuidadores-service.service'; // Importar el servicio de cuidadores
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  URL_API = 'http://localhost:4000/api/ccuidarte-app/pacientes';
  paciente: Paciente[] = [];

  selectedPaciente: Paciente = {
    // todos los datos del paciente
    expediente_paciente: '',
    nombre_paciente: '',
    apellido_paterno: '',
    apellido_materno: '',
    sexo_paciente: '',
    edad_paciente: 0,
    nacionalidad: '',
    domicilio: '',
    ingreso_programa: '',
    colonia: '',
    alcaldia_municipio: '',
    entidadFederativa: '',
    diagnostico: '',
    parentesco_con_cuidador: '',
    tipoPrograma: '',
    observaciones: '',
    recomendaciones: '',
    id_cuidador_paciente: 0,
  };

  // constructor
  constructor(
    private http: HttpClient,
    private cuidadoresService: CuidadoresServiceService
  ) {}

  // metodos del backend // traer los datos desde el backend = peticion HTTP
  getPacientes() {
    return this.http.get<Paciente[]>(this.URL_API);
  }

  filterPacientes(searchText: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.URL_API}/search?query=${searchText}`);
  }

  searchAllPacientes(textoBusqueda: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(
      `${this.URL_API}/search?buscarAlpaciente=${textoBusqueda}`
    );
  }

  getPacienteByCuidador(idCuidador: number): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.URL_API}/cuidador/${idCuidador}`);
  }

  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.URL_API}/${id}`);
  }

  // Método para verificar si un expediente ya está en uso
  checkExpedienteInUse(expediente: string): Observable<boolean> {
    return this.getExpedientes().pipe(
      map((expedientes: string[]) => expedientes.includes(expediente))
    );
  }

  getExpedientes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.URL_API}/expedientes`);
  }

  addPaciente(paciente: Paciente) {
    return this.http.post(this.URL_API, paciente);
  }

  deletePaciente(id: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  updatePaciente(paciente: Paciente): Observable<any> {
    return this.http.put(`${this.URL_API}/${paciente.id_paciente}`, paciente); // url + los datos del paciente
  }

  getTotalPacientes(): Observable<number> {
    return this.http.get<number>(`${this.URL_API}/total-pacientes`);
  }

  getTotalPacientesMenores(): Observable<number> {
    return this.http.get<number>(`${this.URL_API}/total-pacientes-menores`);
  }

  getTotalPacientesMayores(): Observable<number> {
    return this.http.get<number>(`${this.URL_API}/total-pacientes-mayores`);
  }

  getTotalProgramasCECPAM(): Observable<number> {
    return this.http.get<number>(`${this.URL_API}/total-programas-cecpam`);
  }

  getNombreCuidadorDelPaciente(): Observable<Paciente[]> {
    return forkJoin({
      pacientes: this.getPacientes(),
      cuidadores: this.cuidadoresService.getCuidadores(), // Usar el método del servicio de cuidadores
    }).pipe(
      map(({ pacientes, cuidadores }) => {
        return pacientes.map((paciente) => {
          const cuidador = cuidadores.find(
            (c: Cuidador) =>
              c.id_cuidador_paciente === paciente.id_cuidador_paciente
          ); // Declarar el tipo de 'c'
          return {
            ...paciente,
            nombreCompletoCuidador: cuidador //NOMBRE DEL CUIDADOR DEL PACIENTE
              ? `${cuidador.nombreCuidador} ${cuidador.apPatCuidador} ${cuidador.apMatCuidador}`
              : '',
          };
        });
      })
    );
  }
}
