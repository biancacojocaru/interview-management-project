import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, scheduled } from 'rxjs';
import { urls } from '../../../url-configs/url-configs';
import { Schedule, ScheduleEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);

  public getEvent(): Observable<Schedule> {
    const url = urls.api + urls.schedule;

    return this.http.get<Schedule>(url);
  }

  public addEvent(schedule: ScheduleEvent): Observable<any> {
    const url = urls.api + urls.schedule;

    return this.http.post(url, schedule);
  }
}
