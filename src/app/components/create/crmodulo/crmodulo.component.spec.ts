import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmoduloComponent } from './crmodulo.component';

describe('CrmoduloComponent', () => {
  let component: CrmoduloComponent;
  let fixture: ComponentFixture<CrmoduloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmoduloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmoduloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
