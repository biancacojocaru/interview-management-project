import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

interface PostName {
  name: string;
}

@Component({
  selector: 'app-add-vacancy-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './add-vacancy-dialog.component.html',
  styleUrl: './add-vacancy-dialog.component.scss',
})
export class AddVacancyDialogComponent {
  nameControl = new FormControl<PostName | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: PostName [] = [
    {name: 'HR'},
    {name: 'WEB Developer'},
    {name: 'Ceva'},
    {name: 'Tester'},
    {name: 'Softwer Engineer'},
  ];
}
{}