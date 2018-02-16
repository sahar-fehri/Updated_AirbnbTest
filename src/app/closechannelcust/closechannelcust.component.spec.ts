import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosechannelcustComponent } from './closechannelcust.component';

describe('ClosechannelcustComponent', () => {
  let component: ClosechannelcustComponent;
  let fixture: ComponentFixture<ClosechannelcustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosechannelcustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosechannelcustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
