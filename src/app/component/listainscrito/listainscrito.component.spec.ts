import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListainscritoComponent } from './listainscrito.component';

describe('ListainscritoComponent', () => {
  let component: ListainscritoComponent;
  let fixture: ComponentFixture<ListainscritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListainscritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListainscritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
