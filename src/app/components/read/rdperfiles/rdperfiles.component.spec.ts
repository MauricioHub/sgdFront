import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdperfilesComponent } from './rdperfiles.component';

describe('RdperfilesComponent', () => {
  let component: RdperfilesComponent;
  let fixture: ComponentFixture<RdperfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdperfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdperfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
