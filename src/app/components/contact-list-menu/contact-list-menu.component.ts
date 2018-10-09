import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contact-list-menu',
  templateUrl: './contact-list-menu.component.html',
  styleUrls: ['./contact-list-menu.component.scss']
})
export class ContactListMenuComponent implements OnInit {
  @Input() selectedContactId: number;
  @Input() contacts: IContact[];
  @Input() isOpen: Boolean;
  @Output() selection: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setAsSelected(id) {
    this.selection.emit(id);
    this.isOpen = false;
    return false;
  }

}
