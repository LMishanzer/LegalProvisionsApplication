import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDialogComponent } from './reference-dialog.component';

describe('ReferenceDialogComponent', () => {
  let component: ReferenceDialogComponent;
  let fixture: ComponentFixture<ReferenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
