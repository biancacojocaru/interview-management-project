import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
import { VacancyService } from '../shared/services/vacancy.service';
import { Vacancy } from '../shared/models/vacancy.model';
import { Subject, Subscription, of, pipe, takeUntil } from 'rxjs';

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
export class VacanciesComponent implements OnInit, OnDestroy {
  public matDialog = inject(MatDialog);
  public vacancyService = inject(VacancyService);
  private destroy$ = new Subject();

  public displayedColumns: string[] = [
    'positionName',
    'nameDepartment',
    'jobType',
    'statusType',
    'deadLine',
    'location',
  ];
  public dataSource = new MatTableDataSource();

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteVacancy(element: Vacancy) {
    console.log('Delete', element);
  }

  public openDialog() {
    const dialogRef = this.matDialog.open(AddVacancyDialogComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public ngOnInit(): void {
    this.vacancyService
      .getVacancies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((vacancies) => (this.dataSource.data = vacancies));
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
