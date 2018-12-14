import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrpromodComponent } from './crpromod.component';

describe('CrpromodComponent', () => {
  let component: CrpromodComponent;
  let fixture: ComponentFixture<CrpromodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrpromodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrpromodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
