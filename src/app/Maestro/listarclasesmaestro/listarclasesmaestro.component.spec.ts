import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarclasesmaestroComponent } from './listarclasesmaestro.component';

describe('ListarclasesmaestroComponent', () => {
  let component: ListarclasesmaestroComponent;
  let fixture: ComponentFixture<ListarclasesmaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarclasesmaestroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarclasesmaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
