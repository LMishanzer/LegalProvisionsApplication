import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonItemNewComponent } from './comparison-item-new.component';

describe('ComparisonItemNewComponent', () => {
  let component: ComparisonItemNewComponent;
  let fixture: ComponentFixture<ComparisonItemNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonItemNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonItemNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
