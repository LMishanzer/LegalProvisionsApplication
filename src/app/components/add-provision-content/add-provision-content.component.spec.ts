import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvisionContentComponent } from './add-provision-content.component';

describe('AddProvisionContentComponent', () => {
  let component: AddProvisionContentComponent;
  let fixture: ComponentFixture<AddProvisionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProvisionContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProvisionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
