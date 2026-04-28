import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDossier } from './modifier-dossier';

describe('ModifierDossier', () => {
  let component: ModifierDossier;
  let fixture: ComponentFixture<ModifierDossier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierDossier],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierDossier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
