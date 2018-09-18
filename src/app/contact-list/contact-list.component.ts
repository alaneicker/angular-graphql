import { Component, OnInit } from '@angular/core';

import { Contact, Query } from '../interfaces';

import { QueryService } from '../services/query.service';

@Component({
  providers: [QueryService],
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactNames: Contact[];
  selectedContact: Contact;
  selectedContactId: number;
  loading: boolean;

  constructor(private queryService: QueryService) { }

  ngOnInit() {
    this.getContactNames();
    this.getContact(1);
  }

  getContactNames() {
    this.queryService.query(`
        query allContacts {
          allContacts {
            id
            first_name
            last_name
          }
        }
      `).then(res => {
        this.contactNames = res.data.allContacts;
      });
  }

  getContact(id: number) {
    this.loading = true;
    this.selectedContactId = id;

    this.queryService.query(`
      query {
        contact(id: ${id}) {
          first_name
          last_name
          jobTitle
          email
          phone
          bio
          imgUrl
        }
      }
    `).then(res => {
        this.selectedContact = res.data.contact;
        this.loading = false;
      });
    }

}
