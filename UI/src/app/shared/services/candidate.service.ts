import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { urls } from '../../../url-configs/url-configs';
import { id } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private http = inject(HttpClient);

  public getCandidates(): Observable<Candidate[]> {
    const url = urls.api + urls.candidate;

    return this.http.get<Candidate[]>(url);
  }

  public getCandidateById(id: number): Observable<Candidate> {
    const url = `${urls.api}${urls.candidate}/${id}`;
    return this.http.get<Candidate>(url);
  }

  public addCandidate(candidate: Candidate): Observable<number> {
    const url = urls.api + urls.candidate;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<number>(url, candidate, { headers });
  }

  public updateCandidate(candidate: Candidate): Observable<void> {
    const url = `${urls.api}${urls.candidate}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<void>(url, candidate, { headers });
  }

  public deleteCandidate(id: number): Observable<void> {
    const url = `${urls.api + urls.candidate}/${id}`;
    return this.http.delete<void>(url);
  }
}
