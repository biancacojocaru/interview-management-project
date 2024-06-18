import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
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
import { AddVacanciesValidatorService } from '../add-vacancies-validator.service';

interface PostName {
  name: string;
}

interface DepartmentName {
  name: string;
}

@Component({
  selector: 'app-add-vacancy-dialog',
  standalone: true,
  imports: [
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
  templateUrl: './add-vacancy-dialog.component.html',
  styleUrl: './add-vacancy-dialog.component.scss',
})
export class AddVacancyDialogComponent {
  public addVacanciesService = inject(AddVacanciesValidatorService);

  postNames: PostName[] = [
    { name: 'HR' },
    { name: 'WEB Developer' },
    { name: 'Ceva' },
    { name: 'Tester' },
    { name: 'Softwer Engineer' },
  ];

  //pnteru numele departamentului in dialog
  departmentNameControl = new FormControl<DepartmentName | null>(null);
  selectDepartmentNameFormControl = new FormControl('', Validators.required);
  departmentNames: DepartmentName[] = [
    { name: 'HR' },
    { name: 'WEB Development' },
    { name: 'Ceva' },
    { name: 'Tester' },
    { name: 'Engineering' },
  ];

  applyForm = new FormGroup({
    positionName: new FormControl('', Validators.required),
    departmentName: new FormControl('', Validators.required),
    typeJob: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    deadLine: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
  
  addNewVacancy() {
    this.addVacanciesService.addVacancy({
      positionName: this.applyForm.value.positionName ?? '',
      departmentName: this.applyForm.value.departmentName ?? '',
      typeJob: this.applyForm.value.typeJob ?? '',
      status: this.applyForm.value.status ?? '',
      deadLine: this.applyForm.value.deadLine ?? '',
      location: this.applyForm.value.location ?? '',
    });
  }
}
