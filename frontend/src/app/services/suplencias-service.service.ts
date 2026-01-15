import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Suplencia } from '../models/suplencias';
import { PacientesService } from '../services/pacientes.service';
import { CuidadoresServiceService } from '../services/cuidadores-service.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SuplenciasServiceService {
  URL_API = 'http://localhost:4000/api/ccuidarte-app/suplencias';

  selectedSuplencia: Suplencia = {
    // todos los datos de la suplencia
    dia_suplencia: '',
    hora_inicial: '',
    hora_final: '',
    costoGuardia: 0,
    particular: '',
    id_cuidador_paciente: 0,
    concurrencia_anual: '',
    id_paciente: 0,
  };

  constructor(
    private http: HttpClient,
    private cuidadoresService: CuidadoresServiceService,
    private pacientesService: PacientesService
  ) {}

  getSuplencias(): Observable<Suplencia[]> {
    return this.http.get<Suplencia[]>(this.URL_API);
  }
  

  filterSuplencias(query: string): Observable<Suplencia[]> { //esta funcion es la que quiero para poder filtrar las tablas en mi componenete base-datos
    return this.http.get<Suplencia[]>(`${this.URL_API}/filter?query=${query}`);
  }

  addSuplencia(suplencia: Suplencia): Observable<{ id_suplencia: number }> {
    return this.http.post<{ id_suplencia: number }>(this.URL_API, suplencia);
  }

  buscarSuplenciasPorCuidadorYPaciente(
    idCuidador: number,
    idPaciente: number
  ): Observable<Suplencia[]> {
    return this.http.get<Suplencia[]>(`${this.URL_API}/buscar`, {
      params: {
        id_cuidador: idCuidador.toString(),
        id_paciente: idPaciente.toString(),
      },
    });
  }

  getTotalSuplencias(): Observable<number> {
    return this.http.get<number>(`${this.URL_API}/total-suplencias`);
  }

  updateSuplencia(suplencia: Suplencia): Observable<any> {
    return this.http.put(
      `${this.URL_API}/${suplencia.id_suplencia}`,
      suplencia
    );
  }

  deleteSuplencia(id: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getNombreCuidadoryPaciente(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_API).pipe(
      map((suplencias) => {
        return suplencias.map((suplencia) => ({
          ...suplencia,
          nombreCompletoPaciente: `${suplencia.nombre_paciente} ${suplencia.paciente_apellido_paterno} ${suplencia.paciente_apellido_materno}`,
          nombreCompletoCuidador: `${suplencia.nombreCuidador} ${suplencia.apPatCuidador} ${suplencia.apMatCuidador}`,
        }));
      })
    );
  }

  getProximasSuplencias(): Observable<Suplencia[]> {
    return this.http.get<Suplencia[]>(`${this.URL_API}/proximas`);
  }
  
  
}
