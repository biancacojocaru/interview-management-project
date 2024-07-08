import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ScheduleEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-schedule-bottom-sheet',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './schedule-bottom-sheet.component.html',
  styleUrl: './schedule-bottom-sheet.component.scss',
})
export class ScheduleBottomSheetComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { date: string; meetings: ScheduleEvent[] },
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {}

  openDialog() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '500px';

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
}
