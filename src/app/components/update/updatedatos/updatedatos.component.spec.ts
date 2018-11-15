import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedatosComponent } from './updatedatos.component';

describe('UpdatedatosComponent', () => {
  let component: UpdatedatosComponent;
  let fixture: ComponentFixture<UpdatedatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
