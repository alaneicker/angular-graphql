import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Contact, Query } from '../interfaces';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactNames: Contact[];
  selectedContact: Contact;
  selectedContactId: number;
  loading: boolean;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getContactNames();
    this.getContact(1);
  }

  async getContactNames() {
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
    }).subscribe((result: any) => {
      this.contactNames = result.data.allContacts;
    });
  }

  getContact(id: number) {
    this.loading = true;
    this.selectedContactId = id;

    this.apollo.query({
      query: gql`
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
      `
    }).subscribe((result: any) => {
      this.selectedContact = result.data.contact;
      this.loading = false;
    });
  }

}
