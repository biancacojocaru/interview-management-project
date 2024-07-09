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
import { CandidatesDialogComponent } from '../candidates-dialog/candidates-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { CandidateService } from '../shared/services/candidate.service';
import { Subject,Subscription, of ,pipe,takeUntil } from 'rxjs';
import { Candidate} from '../shared/models/candidate.model'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './dialog-delete.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-candidates',
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
    HttpClientModule,
    MatCardModule
  ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent implements OnInit, OnDestroy {
  public matDialog = inject(MatDialog);
  public candidateService = inject(CandidateService);
  private destroy$ = new Subject();

  constructor(private router: Router, public dialog: MatDialog,  private snackBar: MatSnackBar) {}

  public displayedColumns: string[] = [
    'nameCandidate',
    'email',
    'phoneNumber',
    'positionName',
    'nameDepartment',
    'actions',
  ];
  public dataSource = new MatTableDataSource();

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog() {
    const dialogRef = this.matDialog.open(CandidatesDialogComponent, {
      width: '500px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public ngOnInit(): void {
    this.candidateService
      .getCandidates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((candidates) => (this.dataSource.data = candidates));
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public openDeleteDialog(event: Event, candidate: Candidate): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { candidateId: candidate.candidateId  },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteCandidate(candidate.candidateId);
        location.reload();
      }
    });
  }

  public openEditDialog(candidateId: number) {

    const dialogRef = this.matDialog.open(CandidatesDialogComponent, {
      width: '500px',
      height: '700px',
      data: {
        candidateId 
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public deleteCandidate(candidatesId: number) {
    this.candidateService.deleteCandidate(candidatesId).subscribe(
      () => {
        console.log(`Candidate with ID ${candidatesId} deleted successfully`);
        this.snackBar.open('Candidate deleted successfully', 'Close', {
          duration: 2000,
        });
        // Reload the list of candidates or update the UI accordingly
      },
      (error: any) => {
        console.error('Error deleting candidate:', error);
        this.snackBar.open('Error deleting candidate', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
