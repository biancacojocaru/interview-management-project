import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import { urls } from '../../../url-configs/url-configs';
import { Vacancy } from '../models/vacancy.model';

@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  private http = inject(HttpClient);

  public getVacancies(): Observable<Vacancy[]> {
    const url = urls.api + urls.vacancy;

    return this.http.get<Vacancy[]>(url);
  }

  public getVacancyById(id: number): Observable<Vacancy> {
    const url = `${urls.api}${urls.vacancy}/${id}`;
    return this.http.get<Vacancy>(url);
  }

  public addVacancy(vacancy: Vacancy): Observable<number> {
    const url = urls.api + urls.vacancy;
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<number>(url, vacancy);
  }

  public updateVacancy(vacancy: Vacancy): Observable<void> {
    const url = `${urls.api}${urls.vacancy}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<void>(url, vacancy, { headers });
  }

  public deleteVacancy(id: number): Observable<void> {
    const url = `${urls.api + urls.vacancy}/${id}`;
    return this.http.delete<void>(url);
  }
}
