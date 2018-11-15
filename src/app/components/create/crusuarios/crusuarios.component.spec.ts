import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrusuariosComponent } from './crusuarios.component';

describe('CrusuariosComponent', () => {
  let component: CrusuariosComponent;
  let fixture: ComponentFixture<CrusuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrusuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
