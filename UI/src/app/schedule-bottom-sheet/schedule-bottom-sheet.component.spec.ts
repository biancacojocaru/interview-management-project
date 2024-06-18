import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBottomSheetComponent } from './schedule-bottom-sheet.component';

describe('ScheduleBottomSheetComponent', () => {
  let component: ScheduleBottomSheetComponent;
  let fixture: ComponentFixture<ScheduleBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleBottomSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
