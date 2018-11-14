import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdmodulosComponent } from './rdmodulos.component';

describe('RdmodulosComponent', () => {
  let component: RdmodulosComponent;
  let fixture: ComponentFixture<RdmodulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdmodulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdmodulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
