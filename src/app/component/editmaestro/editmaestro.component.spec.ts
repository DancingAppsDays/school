import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmaestroComponent } from './editmaestro.component';

describe('EditmaestroComponent', () => {
  let component: EditmaestroComponent;
  let fixture: ComponentFixture<EditmaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmaestroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
