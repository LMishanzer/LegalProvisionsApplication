import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionSidebarComponent } from './provision-sidebar.component';

describe('ProvisionSidebarComponent', () => {
  let component: ProvisionSidebarComponent;
  let fixture: ComponentFixture<ProvisionSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
