import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionComparisonComponent } from './provision-comparison.component';

describe('ProvisionComparisonComponent', () => {
  let component: ProvisionComparisonComponent;
  let fixture: ComponentFixture<ProvisionComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionComparisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
