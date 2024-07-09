import { DateTime } from 'luxon';

export interface ScheduleEvent {
  eventId: number;
  title: string;
  date: string;
  hour: string;
  location: string;
  nameEmployee: string;
  details: string;
  candidateId: number;
}

export interface Schedule {
  [date: string]: ScheduleEvent[];
}
