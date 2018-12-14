import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpuserproComponent } from './upuserpro.component';

describe('UpuserproComponent', () => {
  let component: UpuserproComponent;
  let fixture: ComponentFixture<UpuserproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpuserproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpuserproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
