import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListDetailComponent } from './contact-list-detail.component';

describe('ContactListDetailoduleComponent', () => {
  let component: ContactListDetailComponent;
  let fixture: ComponentFixture<ContactListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
