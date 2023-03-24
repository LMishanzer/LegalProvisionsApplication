import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionContentComponent } from './provision-content.component';

describe('ProvisionContentComponent', () => {
  let component: ProvisionContentComponent;
  let fixture: ComponentFixture<ProvisionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
