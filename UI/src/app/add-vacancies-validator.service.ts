import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacancy } from './shared/models/vacancy.model';
import { urls } from '../url-configs/url-configs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddVacanciesValidatorService {

  constructor(private http: HttpClient) { }

  public addVacancy(obj: object) {
    console.log(obj)
  }


  
}
