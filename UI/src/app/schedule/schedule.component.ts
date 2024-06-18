import {
  Component,
  InputSignal,
  Signal,
  WritableSignal,
  computed,
  input,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { ScheduleCalendarComponent } from '../schedule-calendar/schedule-calendar.component';

@Component({
  selector: 'calendar',
  styles: [],
  standalone: true,
  imports: [RouterOutlet, CommonModule, ScheduleCalendarComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {
}
