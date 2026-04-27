import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierRdv } from './modifier-rdv';

describe('ModifierRdv', () => {
  let component: ModifierRdv;
  let fixture: ComponentFixture<ModifierRdv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierRdv],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierRdv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
