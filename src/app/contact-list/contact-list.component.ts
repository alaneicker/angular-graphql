import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Contact, Query } from '../interfaces';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactNames: Contact[];
  selectedContact: Contact;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getContactNames();
    this.getContact(1);
  }

  getContactNames() {
    this.apollo.query({
      query: gql`
        query allContacts {
          allContacts {
            id
            first_name
            last_name
          }
        }
      `
    }).subscribe(result => {
      this.contactNames = result.data.allContacts;
    });
  }

  // Gets single contact by ID
  getContact(id: number) {
    this.apollo.query({
      query: gql`
        query {
          contact(id: ${id}) {
            first_name
            last_name
            email
            phone
          }
        }
      `
    }).subscribe(result => {
      this.selectedContact = result.data.contact;
    });
  }

}
