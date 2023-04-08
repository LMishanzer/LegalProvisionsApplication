import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonItemOldComponent } from './comparison-item-old.component';

describe('ComparisonItemOldComponent', () => {
  let component: ComparisonItemOldComponent;
  let fixture: ComponentFixture<ComparisonItemOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonItemOldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonItemOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
