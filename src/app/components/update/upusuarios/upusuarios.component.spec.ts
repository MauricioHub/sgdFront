import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpusuariosComponent } from './upusuarios.component';

describe('UpusuariosComponent', () => {
  let component: UpusuariosComponent;
  let fixture: ComponentFixture<UpusuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpusuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
