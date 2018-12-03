import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedatospComponent } from './updatedatosp.component';

describe('UpdatedatospComponent', () => {
  let component: UpdatedatospComponent;
  let fixture: ComponentFixture<UpdatedatospComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedatospComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedatospComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
