import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenchannelComponent } from './openchannel.component';

describe('OpenchannelComponent', () => {
  let component: OpenchannelComponent;
  let fixture: ComponentFixture<OpenchannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenchannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenchannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
