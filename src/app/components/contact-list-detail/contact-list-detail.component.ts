import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contact-list-detail',
  templateUrl: './contact-list-detail.component.html',
  styleUrls: ['./contact-list-detail.component.scss']
})
export class ContactListDetailComponent implements OnInit {
  @Input() selectedContact: IContact;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  updateContact(selectedContact: IContact) {
    this.update.emit(selectedContact);
  }

  deleteContact(id: number) {
    this.delete.emit(id);
  }

}
