import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ScheduleEvent } from '../shared/models/event.model';
import { ConfirmDialogComponent } from '../vacancies/dialog-delete.component';
import { EventService } from '../shared/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-schedule-bottom-sheet',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './schedule-bottom-sheet.component.html',
  styleUrl: './schedule-bottom-sheet.component.scss',
})
export class ScheduleBottomSheetComponent implements OnInit {
  public matDialog = inject(MatDialog);
  public eventService = inject(EventService);
  private destroy$ = new Subject();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { date: string; meetings: ScheduleEvent[] },
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  openDialog(date: string) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '500px';
    matDialogConfig.data = { date };

    const dialogRef = this.dialog.open(
      AddEventDialogComponent,
      matDialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog(scheduleEvent: ScheduleEvent) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '500px';
    matDialogConfig.data = { scheduleEvent };

    const dialogRef = this.dialog.open(
      AddEventDialogComponent,
      matDialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public openDeleteDialog(event: Event, scheduleEvent: ScheduleEvent): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { eventId: scheduleEvent.eventId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteEvent(scheduleEvent.eventId);
        location.reload();
      }
    });
  }

  public deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe(
      () => {
        console.log(`Event with ID ${eventId} deleted successfully`);
        this.snackBar.open('Event deleted successfully', 'Close', {
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
