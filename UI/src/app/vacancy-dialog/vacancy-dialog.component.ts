import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { VacancyService } from '../shared/services/vacancy.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department, Vacancy } from '../shared/models/vacancy.model';
import { Observable, of } from 'rxjs';
import { DepartmentService } from '../shared/services/department.service';

@Component({
  selector: 'app-vacancy-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './vacancy-dialog.component.html',
  styleUrl: './vacancy-dialog.component.scss',
})
export class VacancyDialogComponent {
  public vacancyService = inject(VacancyService);
  public dialogRef = inject(MatDialogRef<VacancyDialogComponent>);
  public snackBar = inject(MatSnackBar);
  public departmentService = inject(DepartmentService);

  public departments$: Observable<Department[]>;
  public vacancys$: Observable<Vacancy[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { vacancyId: number }) {
    this.vacancys$ = this.vacancyService.getVacancies();
    this.departments$ = this.departmentService.getDepartments();
    if(data?.vacancyId){
      this.vacancyService
        .getVacancyById(data.vacancyId)
        .subscribe((vacancy) => {
        this.applyForm.patchValue({
          positionName: vacancy.positionName,
          departmentId: vacancy.departmentId,
          jobType: vacancy.jobType,
          status: vacancy.statusType,
          deadLine: vacancy.deadLine,
          location: vacancy.location,
        });
      });
    }
  }

  //pnteru numele departamentului in dialog
  public DepartmentControl = new FormControl<Department | null>(null);
  selectDepartmentFormControl = new FormControl('', Validators.required);

  applyForm = new FormGroup({
    positionName: new FormControl('', Validators.required),
    departmentId: new FormControl<number | null>(null, Validators.required),
    jobType: new FormControl(0, Validators.required),
    status: new FormControl(0, Validators.required),
    deadLine: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  public addNewVacancy() {
    if (this.applyForm.valid) {
      const formVacancy: Vacancy = {
        vacanciesId: this.data?.vacancyId ?? 0,
        positionName: this.applyForm.value.positionName ?? '',
        departmentId: this.applyForm.value.departmentId ?? 0,
        nameDepartment: '',
        jobType: this.applyForm.value.jobType ?? 0,
        statusType: this.applyForm.value.status ?? 0,
        deadLine: this.applyForm.value.deadLine ?? '',
        location: this.applyForm.value.location ?? '',
      };
      if(this.data?.vacancyId){
        this.vacancyService
        .updateVacancy(formVacancy)
        .subscribe(() => location.reload());
      }
      else{
        this.vacancyService
        .addVacancy(formVacancy)
        .subscribe(() => location.reload());
      }
    } else {
      this.applyForm.markAllAsTouched();
    }
  }
}
