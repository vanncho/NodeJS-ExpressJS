import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsUserComponent } from './tickets-user.component';

describe('TicketsUserComponent', () => {
  let component: TicketsUserComponent;
  let fixture: ComponentFixture<TicketsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
