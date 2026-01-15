import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // metodos http
import { Cuidador } from '../models/cuidadores'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuidadoresServiceService {
  URL_API = 'http://localhost:4000/api/ccuidarte-app/cuidadores';
  cuidador: Cuidador[] = [];

  selectedCuidador: Cuidador = {
    // todos los datos del cuidador
    nombreCuidador: '',
    apPatCuidador: '',
    apMatCuidador: '',
    sexoCuidador: '',
    edadCuidador: 0,
    telefonoCuidador: '',
    num_suplencias: 0,
    ultima_modificacion: '',
    ingreso_programa: '',
  }

  constructor(private http: HttpClient) { }

  getCuidadores() {
    return this.http.get<Cuidador[]>(this.URL_API);
  }  

  filterCuidadores(query: string): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(`${this.URL_API}/filter?query=${query}`);
  }

  searchAllCuidadores(textoBusqueda: string): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(
      `${this.URL_API}/search?buscarAlcuidador=${textoBusqueda}`
    );
  }

  getTotalSuplencias(idCuidador: number): Observable<number> {
    return this.http.get<number>(`${this.URL_API}/total-suplencias/${idCuidador}`);
  }

  getCuidadorById(id: number): Observable<Cuidador> {
    return this.http.get<Cuidador>(`${this.URL_API}/${id}`);
  }

  addCuidador(cuidador: Cuidador) {
    return this.http.post(this.URL_API, cuidador);
  }

  updateCuidador(cuidador: Cuidador): Observable<any> {
    return this.http.put(`${this.URL_API}/${cuidador.id_cuidador_paciente}`, cuidador); // url + los datos del paciente
  }

  deleteCuidador(id: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getTotalCuidadores(): Observable<number> {
    return this.http.get<number>(`${this.URL_API}/total-cuidadores`);
  }
  
}
