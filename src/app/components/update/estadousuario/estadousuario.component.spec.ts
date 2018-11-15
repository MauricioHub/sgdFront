import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadousuarioComponent } from './estadousuario.component';

describe('EstadousuarioComponent', () => {
  let component: EstadousuarioComponent;
  let fixture: ComponentFixture<EstadousuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadousuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
