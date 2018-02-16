import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyallowanceComponent } from './verifyallowance.component';

describe('VerifyallowanceComponent', () => {
  let component: VerifyallowanceComponent;
  let fixture: ComponentFixture<VerifyallowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyallowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyallowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
