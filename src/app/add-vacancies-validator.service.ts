import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddVacanciesValidatorService {

  constructor() { }

  public addVacancy(obj: object) {
    console.log(obj)
  }


}
