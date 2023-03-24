import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionMenuItemComponent } from './provision-menu-item.component';

describe('ProvisionMenuItemComponent', () => {
  let component: ProvisionMenuItemComponent;
  let fixture: ComponentFixture<ProvisionMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
