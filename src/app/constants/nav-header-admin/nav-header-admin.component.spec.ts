import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderAdminComponent } from './nav-header-admin.component';

describe('NavHeaderAdminComponent', () => {
  let component: NavHeaderAdminComponent;
  let fixture: ComponentFixture<NavHeaderAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavHeaderAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
