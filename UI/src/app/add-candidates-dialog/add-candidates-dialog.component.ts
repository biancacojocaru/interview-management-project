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
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'
import { AddCandidatesValidatorService } from '../add-candidates-validator.service';

interface PositionName {
  name: string;
}

interface Department {
  name: string;
}

@Component({
  selector: 'app-add-candidates-dialog',
  standalone: true,
  imports: [
    JsonPipe,
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
  templateUrl: './add-candidates-dialog.component.html',
  styleUrl: './add-candidates-dialog.component.scss'
})
export class AddCandidatesDialogComponent {
  public addCandidatesService = inject(AddCandidatesValidatorService);

  postNames: PositionName[] = [
    { name: 'HR' },
    { name: 'WEB Developer' },
    { name: 'Backend Developer' },
    { name: 'Tester' },
    { name: 'UI/UX Designer' },
  ];

  //pnteru numele departamentului in dialog
  departmentControl = new FormControl<Department | null>(null);
  selectDepartmentFormControl = new FormControl('', Validators.required);
  departments: Department[] = [
    { name: 'HR' },
    { name: 'WEB Development' },
    { name: 'IT' },
    { name: 'Testing' },
    { name: 'Management' },
    { name: 'Design'},
  ];

  applyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    cv: new FormControl('', Validators.required),
    otherDocuments: new FormControl('', Validators.required),
    positionName: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
  });
  
  addNewcandidate() {
    this.addCandidatesService.addCandidate({
      name: this.applyForm.value.name ?? '',
      email: this.applyForm.value.email ?? '',
      phone: this.applyForm.value.phone ?? '',
      cv: this.applyForm.value.cv ?? '',
      otherDocuments: this.applyForm.value.otherDocuments ?? '',
      positionName: this.applyForm.value.positionName ?? '',
      department: this.applyForm.value.department ?? '',
    });
  }
}
