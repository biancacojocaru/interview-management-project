import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddEventServiceService {

  constructor() { }

  public addEvent(obj: object){
    console.log(obj)
  }
    
}
