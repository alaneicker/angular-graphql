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
  contacts: Observable<Contact[]>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.contacts = this.apollo.watchQuery<Query>({
      query: gql`
        query {
          allContacts {
            id
            first_name
            last_name
            email
            phone
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.allContacts)
      );
  }

}
