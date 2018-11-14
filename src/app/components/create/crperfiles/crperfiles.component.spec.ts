import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrperfilesComponent } from './crperfiles.component';

describe('CrperfilesComponent', () => {
  let component: CrperfilesComponent;
  let fixture: ComponentFixture<CrperfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrperfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrperfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
