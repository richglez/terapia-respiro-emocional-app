import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchAllTablesInDataBaseService {
  URL_API = 'http://localhost:4000/api/ccuidarte-app/data-base/searchInDataBase';

  constructor(private http: HttpClient) { }

  searchInDataBase(term: string, category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_API}?term=${term}&category=${category}`);
  }
}
