import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosechannelComponent } from './closechannel.component';

describe('ClosechannelComponent', () => {
  let component: ClosechannelComponent;
  let fixture: ComponentFixture<ClosechannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosechannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosechannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
