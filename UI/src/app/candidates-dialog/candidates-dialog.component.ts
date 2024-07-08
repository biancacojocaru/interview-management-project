import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
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
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CandidateService } from '../shared/services/candidate.service';
import { Candidate } from '../shared/models/candidate.model';
import { Observable, of } from 'rxjs';
import { VacancyService } from '../shared/services/vacancy.service';
import { Department, Vacancy } from '../shared/models/vacancy.model';
import { DepartmentService } from '../shared/services/department.service';

@Component({
  selector: 'app-candidates-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './candidates-dialog.component.html',
  styleUrl: './candidates-dialog.component.scss',
})
export class CandidatesDialogComponent {
  public dialogRef = inject(MatDialogRef<CandidatesDialogComponent>);
  public candidateService = inject(CandidateService);
  public vacancyService = inject(VacancyService);
  public departmentService = inject(DepartmentService);

  public vacancies$: Observable<Vacancy[]>;
  public departments$: Observable<Department[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { candidateId: number }) {
    this.vacancies$ = this.vacancyService.getVacancies();
    this.departments$ = this.departmentService.getDepartments();
    if (data?.candidateId) {
      this.candidateService
        .getCandidateById(data.candidateId)
        .subscribe((candidate) => {
          this.applyForm.patchValue({
            name: candidate.nameCandidate,
            email: candidate.email,
            phone: candidate.phoneNumber,
            cv: candidate.cv,
            otherDocuments: candidate.document,
            vacanciesId: candidate.vacanciesId,
            departmentId: candidate.departmentId,
          });
        });
    }
  }

  applyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    cv: new FormControl('', Validators.required),
    otherDocuments: new FormControl('', Validators.required),
    vacanciesId: new FormControl<number | null>(null, Validators.required),
    departmentId: new FormControl<number | null>(null, Validators.required),
  });

  public addNewCandidate() {
    if (this.applyForm.valid) {
      const formCandidate: Candidate = {
        candidateId: this.data?.candidateId ?? 0,
        nameCandidate: this.applyForm.value.name ?? '',
        email: this.applyForm.value.email ?? '',
        phoneNumber: this.applyForm.value.phone ?? '',
        cv: this.applyForm.value.cv ?? '',
        document: this.applyForm.value.otherDocuments ?? '',
        vacanciesId: this.applyForm.value.vacanciesId ?? 0,
        departmentId: this.applyForm.value.departmentId ?? 0,
      };

      if (this.data?.candidateId) {
        this.candidateService
          .updateCandidate(formCandidate)
          .subscribe(() => location.reload());
      } else {
        this.candidateService
          .addCandidate(formCandidate)
          .subscribe(() => location.reload());
      }
    } else {
      this.applyForm.markAllAsTouched();
    }
  }
}
