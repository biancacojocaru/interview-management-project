import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacancyDialogComponent } from './add-vacancy-dialog.component';

describe('AddVacancyDialogComponent', () => {
  let component: AddVacancyDialogComponent;
  let fixture: ComponentFixture<AddVacancyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVacancyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVacancyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
