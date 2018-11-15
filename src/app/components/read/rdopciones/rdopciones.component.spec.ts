import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdopcionesComponent } from './rdopciones.component';

describe('RdopcionesComponent', () => {
  let component: RdopcionesComponent;
  let fixture: ComponentFixture<RdopcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdopcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
