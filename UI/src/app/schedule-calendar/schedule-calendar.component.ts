import {
  Component,
  InputSignal,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { Meetings } from './meetings.interface';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ScheduleBottomSheetComponent } from '../schedule-bottom-sheet/schedule-bottom-sheet.component';
import { Schedule, ScheduleEvent } from '../shared/models/event.model';
import { Observable } from 'rxjs';
import { EventService } from '../shared/services/event.service';

const MEETINGS = {
  '2024-06-05': ['Dring Coffee', 'Learn React', 'Sleep'],
  '2024-06-06': ['Dring Coffee', 'Learn Angular', 'Sleep', 'Bla'],
};

@Component({
  selector: 'app-schedule-calendar',
  standalone: true,
  imports: [CommonModule, ScheduleCalendarComponent, MatBottomSheetModule],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
})
export class ScheduleCalendarComponent {
  public eventService = inject(EventService);

  public schedule$: Observable<Schedule>;
  meetings: Signal<Schedule> = signal({});
  today: Signal<DateTime>;
  firstDayOfActiveMonth: WritableSignal<DateTime>;
  activeDay: WritableSignal<DateTime | null>;
  weekDays: Signal<string[]>;
  daysOfMonth: Signal<DateTime[]>;
  DATE_MED = DateTime.DATE_MED;

  constructor(private bottomSheet: MatBottomSheet) {
    this.today = signal(DateTime.local());
    this.firstDayOfActiveMonth = signal(this.today().startOf('month'));
    this.activeDay = signal(null);
    this.weekDays = signal(Info.weekdays('short'));
    this.daysOfMonth = computed(() => {
      return Interval.fromDateTimes(
        this.firstDayOfActiveMonth().startOf('week'),
        this.firstDayOfActiveMonth().endOf('month').endOf('week')
      )
        .splitBy({ day: 1 })
        .map((d) => {
          if (d.start === null) {
            throw new Error('Wrong dates');
          }
          return d.start;
        });
    });

    this.schedule$ = this.eventService.getEvent();
    this.schedule$.subscribe((schedule) => (this.meetings = signal(schedule)));
  }

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 })
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 })
    );
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }

  openSchedule(day: DateTime): void {
    this.activeDay.set(day);
    const date = day.toLocaleString(this.DATE_MED);
    const meetings = this.activeDayMeetings();
    this.bottomSheet.open(ScheduleBottomSheetComponent, {
      data: { date, meetings },
    });
  }

  getNumberOfEvents(day: DateTime): number {
    const dayIso = day.toISODate();
    if (!dayIso) return 0;

    return this.meetings()[dayIso]?.length ?? 0;
  }

  activeDayMeetings(): ScheduleEvent[] {
    const activeDay = this.activeDay();
    if (!activeDay) return [];
    const activeDayISO = activeDay.toISODate();
    if (!activeDayISO) return [];

    return this.meetings()[activeDayISO] ?? [];
  }
}
