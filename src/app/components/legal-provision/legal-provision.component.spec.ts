import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalProvisionComponent } from './legal-provision.component';

describe('LegalProvisionComponent', () => {
  let component: LegalProvisionComponent;
  let fixture: ComponentFixture<LegalProvisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalProvisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalProvisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
