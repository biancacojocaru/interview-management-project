import { NgFor, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-schedule-bottom-sheet',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './schedule-bottom-sheet.component.html',
  styleUrl: './schedule-bottom-sheet.component.scss',
})
export class ScheduleBottomSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { date: string; meetings: string[] }
  ) {}
}
