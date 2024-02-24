import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinscripdocComponent } from './preinscripdoc.component';

describe('PreinscripdocComponent', () => {
  let component: PreinscripdocComponent;
  let fixture: ComponentFixture<PreinscripdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreinscripdocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreinscripdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
