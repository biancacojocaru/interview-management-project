import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddVacancyDialogComponent } from '../add-vacancy-dialog/add-vacancy-dialog.component';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

export interface JobVacancy {
  postName: string;
  department: string;
  jobType: string;
  status: string;
  deadLine: string;
  location: string;
  actions: '';
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
// ];

const ELEMENT_DATA: JobVacancy[] = [
  {
    postName: 'HR',
    department: 'HR',
    jobType: 'Full-Time',
    status: 'Started',
    deadLine: '23/07/2024',
    location: 'AFI Park 4, Bd-ul Timisoara 4A',
    actions: '',
  },
  {
    postName: 'sgefgwbe',
    department: 'Implementare',
    jobType: 'Full-Time',
    status: 'On-going',
    deadLine: '23/07/2024',
    location: 'AFI Park 4, Bd-ul Timisoara 4A',
    actions: '',
  },
  {
    postName: 'WEB Developer',
    department: 'Developement',
    jobType: 'Full-Time',
    status: 'Started',
    deadLine: '23/06/2024',
    location: 'AFI Park 4, Bd-ul Timisoara 4A',
    actions: '',
  },
  {
    postName: 'Tester',
    department: 'Developement',
    jobType: 'Full-Time',
    status: 'On-going',
    deadLine: '27/06/2024',
    location: 'AFI Park 4, Bd-ul Timisoara 4A',
    actions: '',
  },
];

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,
  ],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})
export class VacanciesComponent {
  public matDialog = inject(MatDialog);

  public displayedColumns: string[] = [
    'postName',
    'department',
    'jobType',
    'status',
    'deadLine',
    'location',
    'actions',
  ];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteVacancy(element: JobVacancy) {
    console.log('Delete', element);
  }

  public openDialog() {
    const dialogRef = this.matDialog.open(AddVacancyDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
