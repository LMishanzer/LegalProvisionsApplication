import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvisionComponent } from './add-provision.component';

describe('AddProvisionComponent', () => {
  let component: AddProvisionComponent;
  let fixture: ComponentFixture<AddProvisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProvisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProvisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
