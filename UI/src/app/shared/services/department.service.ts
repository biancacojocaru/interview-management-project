import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Department } from "../models/vacancy.model";
import { urls } from "../../../url-configs/url-configs";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class DepartmentService {
    private http = inject(HttpClient);

    public getDepartments(): Observable<Department[]> {
        const url = urls.api + urls.department;
    
        return this.http.get<Department[]>(url);
      }
  
  }
  