import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpopcionesComponent } from './upopciones.component';

describe('UpopcionesComponent', () => {
  let component: UpopcionesComponent;
  let fixture: ComponentFixture<UpopcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpopcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
