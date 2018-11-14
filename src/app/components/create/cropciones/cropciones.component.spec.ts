import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropcionesComponent } from './cropciones.component';

describe('CropcionesComponent', () => {
  let component: CropcionesComponent;
  let fixture: ComponentFixture<CropcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
