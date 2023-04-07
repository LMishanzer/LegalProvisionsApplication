import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionListComponent } from './provision-list.component';

describe('ProvisionListComponent', () => {
  let component: ProvisionListComponent;
  let fixture: ComponentFixture<ProvisionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
