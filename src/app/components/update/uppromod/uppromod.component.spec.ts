import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UppromodComponent } from './uppromod.component';

describe('UppromodComponent', () => {
  let component: UppromodComponent;
  let fixture: ComponentFixture<UppromodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UppromodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UppromodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
