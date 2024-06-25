import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddCandidatesValidatorService {

  constructor() { }

  public addCandidate(obj: object) {
    console.log(obj)
  }
}
