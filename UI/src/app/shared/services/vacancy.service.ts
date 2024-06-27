import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import { urls } from '../../../url-configs/url-configs';
import { Vacancy } from '../models/vacancy.model';

// 'https://localhost:7038/api/Department'

@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  private http = inject(HttpClient);

  // public getDepartments(): Observable<Department[]> {
  //   const url = urls.api + urls.department;

  //   return this.http.get<Department[]>(url);
  // }

  public getVacancies(): Observable<Vacancy[]> {
    const url = urls.api + urls.vacancy;

    return this.http.get<Vacancy[]>(url);
  }
}
