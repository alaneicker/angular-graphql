import { Component, OnInit, Input } from '@angular/core';
import { IContact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contact-list-detail',
  templateUrl: './contact-list-detail.component.html',
  styleUrls: ['./contact-list-detail.component.scss']
})
export class ContactListDetailComponent implements OnInit {
  @Input() selectedContact: IContact;

  constructor() { }

  ngOnInit() {
  }

}
