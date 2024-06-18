import { Component, OnInit ,inject,ChangeDetectionStrategy} from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
import { NgIf } from '@angular/common';
import { AddEventServiceService } from '../add-event-service.service';
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';



@Component({
  selector: 'app-add-event-dialog',
  standalone: true,
  imports: [
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
  public addEventService = inject(AddEventServiceService);


    public eventFormGroup = new FormGroup({
    titleCtrl: new FormControl('', Validators.required), // Titlul evenimentului
    dateCtrl: new FormControl('', Validators.required), // Data interviului
    startTimeCtrl: new FormControl('', Validators.required), // Ora începerii
    durationCtrl: new FormControl('', Validators.required), // Durata interviului
    physicalLocationCtrl: new FormControl('', Validators.required), // Locatia fizică
    onlineLocationCtrl: new FormControl('', Validators.required), // Locatie online
    interviewersCtrl: new FormControl('', Validators.required), // Intervievatori
    emailCtrl: new FormControl('', [Validators.required, Validators.email]), // Email candidat
    phoneCtrl: new FormControl('', Validators.required), // Telefon
    descriptionCtrl: new FormControl('', Validators.required), // Descrierea interviului
    cvCtrl: new FormControl('', Validators.required), // CV-ul
    letterCtrl: new FormControl('', Validators.required), // Scrisoarea de intenţie
    otherDocsCtrl: new FormControl('', Validators.required), // Alte documente
  });
  isLinear = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    private _formBuilder: FormBuilder
  ) {}

  addEvent(){
    this.addEventService.addEvent({
      titleCtrl: this.eventFormGroup.value.titleCtrl ?? '',
      dateCtrl: this.eventFormGroup.value.dateCtrl ?? '',
      startTimeCtrl: this.eventFormGroup.value.startTimeCtrl ?? '',
      durationCtrl: this.eventFormGroup.value.durationCtrl ?? '',
      physicalLocationCtrl: this.eventFormGroup.value.physicalLocationCtrl ?? '',
      onlineLocationCtrl: this.eventFormGroup.value.onlineLocationCtrl ?? '',
      interviewersCtrl: this.eventFormGroup.value.interviewersCtrl ?? '',
      emailCtrl: this.eventFormGroup.value.emailCtrl ?? '',
      phoneCtrl: this.eventFormGroup.value.phoneCtrl ?? '',
      descriptionCtrl: this.eventFormGroup.value.descriptionCtrl ?? '',
      cvCtrl: this.eventFormGroup.value.cvCtrl ?? '',
      letterCtrl: this.eventFormGroup.value.letterCtrl ?? '',
      otherDocsCtrl: this.eventFormGroup.value.otherDocsCtrl ?? '',
    });

  }

  
}
