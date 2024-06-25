import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidatesDialogComponent } from './add-candidates-dialog.component';

describe('AddCandidatesDialogComponent', () => {
  let component: AddCandidatesDialogComponent;
  let fixture: ComponentFixture<AddCandidatesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCandidatesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCandidatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
