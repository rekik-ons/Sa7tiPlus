import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRdv } from './edit-rdv';

describe('EditRdv', () => {
  let component: EditRdv;
  let fixture: ComponentFixture<EditRdv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRdv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRdv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
