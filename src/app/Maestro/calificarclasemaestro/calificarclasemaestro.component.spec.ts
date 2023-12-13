import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarclasemaestroComponent } from './calificarclasemaestro.component';

describe('CalificarclasemaestroComponent', () => {
  let component: CalificarclasemaestroComponent;
  let fixture: ComponentFixture<CalificarclasemaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificarclasemaestroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarclasemaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
