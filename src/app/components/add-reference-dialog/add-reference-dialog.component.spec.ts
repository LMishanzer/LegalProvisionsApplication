import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferenceDialogComponent } from './add-reference-dialog.component';

describe('AddReferenceDialogComponent', () => {
  let component: AddReferenceDialogComponent;
  let fixture: ComponentFixture<AddReferenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReferenceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
