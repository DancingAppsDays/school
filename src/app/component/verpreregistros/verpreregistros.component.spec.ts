import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpreregistrosComponent } from './verpreregistros.component';

describe('VerpreregistrosComponent', () => {
  let component: VerpreregistrosComponent;
  let fixture: ComponentFixture<VerpreregistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerpreregistrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerpreregistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
