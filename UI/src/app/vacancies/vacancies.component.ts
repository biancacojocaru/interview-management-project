import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VacancyDialogComponent } from '../vacancy-dialog/vacancy-dialog.component';
import { VacancyService } from '../shared/services/vacancy.service';
import { Vacancy } from '../shared/models/vacancy.model';
import { Subject, Subscription, of, pipe, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from './dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

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
    MatCardModule,
    DatePipe
  ],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})
export class VacanciesComponent implements OnInit, OnDestroy {
  public matDialog = inject(MatDialog);
  public vacancyService = inject(VacancyService);
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public displayedColumns: string[] = [
    'positionName',
    'nameDepartment',
    'jobType',
    'statusType',
    'deadLine',
    'location',
    'edit',
  ];
  public dataSource = new MatTableDataSource();

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog() {
    const dialogRef = this.matDialog.open(VacancyDialogComponent, {
      width: '600px',
      height: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        console.log('The dialog was closed');
        location.reload();
      }
    });
  }

  public ngOnInit(): void {
    this.vacancyService
      .getVacancies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((vacancies) => (this.dataSource.data = vacancies));
  }

  public openEditDialog(vacancyId: number) {
    const dialogRef = this.matDialog.open(VacancyDialogComponent, {
      width: '500px',
      height: '700px',
      data: {
        vacancyId 
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public openDeleteDialog(event: Event, vacancy: Vacancy): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { vacancyId: vacancy.vacanciesId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteVacancy(vacancy.vacanciesId);
        location.reload();
      }
    });
  }

  public deleteVacancy(vacanciesId: number) {
    this.vacancyService.deleteVacancy(vacanciesId).subscribe(
      () => {
        console.log(`Vacancy with ID ${vacanciesId} deleted successfully`);
        this.snackBar.open('Vacancy deleted successfully', 'Close', {
          duration: 2000,
        });
        // Reload the list of vacancies or update the UI accordingly
      },
      (error: any) => {
        console.error('Error deleting vacancy:', error);
        this.snackBar.open('Error deleting vacancy', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
