import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpusuariosopcionesComponent } from './upusuariosopciones.component';

describe('UpusuariosopcionesComponent', () => {
  let component: UpusuariosopcionesComponent;
  let fixture: ComponentFixture<UpusuariosopcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpusuariosopcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpusuariosopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
