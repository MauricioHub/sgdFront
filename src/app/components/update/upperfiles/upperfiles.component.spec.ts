import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperfilesComponent } from './upperfiles.component';

describe('UpperfilesComponent', () => {
  let component: UpperfilesComponent;
  let fixture: ComponentFixture<UpperfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpperfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
