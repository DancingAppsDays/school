import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraradminComponent } from './registraradmin.component';

describe('RegistraradminComponent', () => {
  let component: RegistraradminComponent;
  let fixture: ComponentFixture<RegistraradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistraradminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistraradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
