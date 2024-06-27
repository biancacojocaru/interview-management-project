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
import { AddCandidatesDialogComponent } from '../add-candidates-dialog/add-candidates-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { CandidateService } from '../shared/services/candidate.service';
import { Subject,Subscription, of ,pipe,takeUntil } from 'rxjs';
import { Candidate} from '../shared/models/candidate.model'; 

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
  ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent implements OnInit, OnDestroy {
  public matDialog = inject(MatDialog);
  public candidateService = inject(CandidateService);
  private destroy$ = new Subject();

  public displayedColumns: string[] = [
    'nameCandidate',
    'email',
    'phoneNumber',
    'cv',
    'documents',
    'positionName',
    'nameDepartment',
  ];
  public dataSource = new MatTableDataSource();

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteVacancy(element: Candidate) {
    console.log('Delete', element);
  }

  public openCandidatesDialog() {
    const dialogRef = this.matDialog.open(AddCandidatesDialogComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  // Example row click function
  onRowClicked(row: Candidate) {
    console.log('Row clicked', row);
    // Implement row click actions as needed
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
}
