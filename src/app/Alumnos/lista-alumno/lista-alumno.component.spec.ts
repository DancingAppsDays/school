import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlumnoComponent } from './lista-alumno.component';

describe('ListaAlumnoComponent', () => {
  let component: ListaAlumnoComponent;
  let fixture: ComponentFixture<ListaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
