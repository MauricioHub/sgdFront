import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdusersopcComponent } from './rdusersopc.component';

describe('RdusersopcComponent', () => {
  let component: RdusersopcComponent;
  let fixture: ComponentFixture<RdusersopcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdusersopcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdusersopcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
