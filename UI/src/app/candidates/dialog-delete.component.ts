import { Component, Inject, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidateService } from '../shared/services/candidate.service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButtonModule, MatButton],
  standalone: true,
  template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content container>
      <p>Are you sure you want to delete this candidate?</p>
    </div>
    <div class="mat-dialog-actions">
      <button mat-flat-button class="main" (click)="onCancel()">Cancel</button>
      <button
        mat-flat-button
        class="main"
        (click)="onConfirm()"
        cdkFocusInitial
      >
        Confirm
      </button>
    </div>

    <style>
      p,
      h1 {
        text-align: center;
        padding: 20px;
        color: var(--secondary);
        font-weight: bold;
      }

      .mat-dialog-actions {
        display: flex;
        justify-content: center;
        padding: 10px;
      }

      .mat-button {
        background-color: var(--main);
        color: white;
        border-radius: 5px;
        font-size: medium;
        border: none;
        width: 100px;
        height: 20px;
        margin: 10px;
      }

      .main {
        margin: 10px;
      }
    </style>
  `,
})
export class ConfirmDialogComponent {
  public candidateService = inject(CandidateService);
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { candidateId: number }
  ) {}

  onConfirm(): void {
    this.candidateService.deleteCandidate(this.data.candidateId);
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
