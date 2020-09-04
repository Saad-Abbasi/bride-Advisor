import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripPaymentComponent } from './strip-payment.component';

describe('StripPaymentComponent', () => {
  let component: StripPaymentComponent;
  let fixture: ComponentFixture<StripPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
