import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrusersopcComponent } from './crusersopc.component';

describe('CrusersopcComponent', () => {
  let component: CrusersopcComponent;
  let fixture: ComponentFixture<CrusersopcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrusersopcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrusersopcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
