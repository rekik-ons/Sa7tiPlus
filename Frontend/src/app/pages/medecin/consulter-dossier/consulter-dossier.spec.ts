import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consulter } from './consulter';

describe('Consulter', () => {
  let component: Consulter;
  let fixture: ComponentFixture<Consulter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consulter],
    }).compileComponents();

    fixture = TestBed.createComponent(Consulter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
