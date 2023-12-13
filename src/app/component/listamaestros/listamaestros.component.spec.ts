import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamaestrosComponent } from './listamaestros.component';

describe('ListamaestrosComponent', () => {
  let component: ListamaestrosComponent;
  let fixture: ComponentFixture<ListamaestrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListamaestrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListamaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
