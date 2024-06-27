import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { urls } from '../../../url-configs/url-configs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private http = inject(HttpClient);

  public getCandidates(): Observable<Candidate[]> {
    const url = urls.api + urls.candidate;

    return this.http.get<Candidate[]>(url);
  }
}
