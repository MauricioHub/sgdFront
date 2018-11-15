import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdusuariosComponent } from './rdusuarios.component';

describe('RdusuariosComponent', () => {
  let component: RdusuariosComponent;
  let fixture: ComponentFixture<RdusuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdusuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
