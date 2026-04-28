import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterRdv } from './consulter-rdv';

describe('ConsulterRdv', () => {
  let component: ConsulterRdv;
  let fixture: ComponentFixture<ConsulterRdv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterRdv],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsulterRdv);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
