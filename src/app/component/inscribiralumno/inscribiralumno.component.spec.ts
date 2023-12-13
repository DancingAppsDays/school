import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribiralumnoComponent } from './inscribiralumno.component';

describe('InscribiralumnoComponent', () => {
  let component: InscribiralumnoComponent;
  let fixture: ComponentFixture<InscribiralumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscribiralumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscribiralumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
