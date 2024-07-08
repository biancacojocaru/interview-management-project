import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { EventService } from '../shared/services/event.service';
import { ScheduleEvent } from '../shared/models/event.model';
import { Candidate } from '../shared/models/candidate.model';
import { CandidateService } from '../shared/services/candidate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-event-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    ReactiveFormsModule,
    NgIf,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-event-dialog.component.html',
  styleUrl: './add-event-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEventDialogComponent {
  public eventService = inject(EventService);
  public candidateService = inject(CandidateService);

  public candidates$: Observable<Candidate[]>;

  public eventFormGroup = new FormGroup({
    title: new FormControl('', Validators.required), // Titlul evenimentului
    date: new FormControl('', Validators.required), // Data interviului
    hour: new FormControl('', Validators.required), // Ora începerii
    location: new FormControl('', Validators.required), // Locatia fizică
    interviewer: new FormControl('', Validators.required), // Intervievatori
    description: new FormControl('', Validators.required), // Descrierea interviului
    candidateId: new FormControl<number | null>(null, Validators.required),
  });
  isLinear = true;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { scheduleEvent: ScheduleEvent }
  ) {
    this.candidates$ = this.candidateService.getCandidates();
    if (this.data?.scheduleEvent) {
      this.eventFormGroup.patchValue({
        title: this.data?.scheduleEvent.title,
        date: this.data?.scheduleEvent?.date,
        hour: this.data?.scheduleEvent?.hour,
        location: this.data?.scheduleEvent?.location,
        interviewer: this.data?.scheduleEvent?.nameEmployee,
        description: this.data?.scheduleEvent?.details,
        candidateId: this.data?.scheduleEvent?.candidateId,
      });
    }
  }

  public addEvent() {
    if (this.eventFormGroup.valid) {
      const formEvent: ScheduleEvent = {
        eventId: this.data?.scheduleEvent?.eventId ?? 0,
        title: this.eventFormGroup.value.title ?? '',
        date: this.eventFormGroup.value.date ?? '',
        hour: this.eventFormGroup.value.hour ?? '',
        location: this.eventFormGroup.value.location ?? '',
        nameEmployee: this.eventFormGroup.value.interviewer ?? '',
        details: this.eventFormGroup.value.description ?? '',
        candidateId: this.eventFormGroup.value.candidateId ?? 0,
      };
      this.eventService.addEvent(formEvent).subscribe(() => location.reload());
    } else {
      this.eventFormGroup.markAllAsTouched();
    }
  }
}
