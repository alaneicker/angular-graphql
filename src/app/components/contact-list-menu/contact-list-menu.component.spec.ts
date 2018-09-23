import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListMenuComponent } from './contact-list-menu.component';

describe('ContactListMenuComponent', () => {
  let component: ContactListMenuComponent;
  let fixture: ComponentFixture<ContactListMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
