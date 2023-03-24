import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionMenuComponent } from './provision-menu.component';

describe('ProvisionMenuComponent', () => {
  let component: ProvisionMenuComponent;
  let fixture: ComponentFixture<ProvisionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
