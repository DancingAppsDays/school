import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapreregistrosComponent } from './listapreregistros.component';

describe('ListapreregistrosComponent', () => {
  let component: ListapreregistrosComponent;
  let fixture: ComponentFixture<ListapreregistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListapreregistrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListapreregistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
