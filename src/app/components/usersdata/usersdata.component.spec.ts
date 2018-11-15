import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersdataComponent } from './usersdata.component';

describe('UsersdataComponent', () => {
  let component: UsersdataComponent;
  let fixture: ComponentFixture<UsersdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
