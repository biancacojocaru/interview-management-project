import { Component,inject } from '@angular/core';
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

export interface Candidates {
  name: string;
  email: string;
  phoneNumber: string;
  cv: string;
  otherDocuments: string;
  positionName: string;
  department: string;
}

const ELEMENT_DATA: Candidates[] = [
  {
    name: 'Bianca Cojocaru',
    email: 'bcojocaru@gmail.com',
    phoneNumber: '0766886330',
    cv: 'link',
    otherDocuments: 'link',
    positionName: 'WEB Developer',
    department: 'Development',
  },
  {
    name: 'Andrei Popescu',
    email: 'andrei.popescu@example.com',
    phoneNumber: '0745123456',
    cv: 'link',
    otherDocuments: 'link',
    positionName: 'Backend Developer',
    department: 'IT',
  },
  {
    name: 'Maria Ionescu',
    email: 'maria.ionescu@example.com',
    phoneNumber: '0722334455',
    cv: 'link',
    otherDocuments: 'link',
    positionName: 'Project Manager',
    department: 'Management',
  },
  {
    name: 'Vlad Georgescu',
    email: 'vlad.georgescu@example.com',
    phoneNumber: '0733445566',
    cv: 'link',
    otherDocuments: 'link',
    positionName: 'UI/UX Designer',
    department: 'Design',
  },
  {
    name: 'Iulia Litoiu',
    email: 'iuli.litoiu@example.com',
    phoneNumber: '0733435566',
    cv: 'link',
    otherDocuments: 'link',
    positionName: 'UI/UX Designer',
    department: 'Design',
  },
];

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})

export class CandidatesComponent {
  public matDialog = inject(MatDialog);

  public displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'cv',
    'otherDocuments',
    'positionName',
    'department',
  ];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteVacancy(element: Candidates) {
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

}
