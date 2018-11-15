import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpmodulosComponent } from './upmodulos.component';

describe('UpmodulosComponent', () => {
  let component: UpmodulosComponent;
  let fixture: ComponentFixture<UpmodulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpmodulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpmodulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
