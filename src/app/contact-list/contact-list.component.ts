import { Component, OnInit } from '@angular/core';
import { IContact } from '../interfaces/contact.interface';
import { QueryService } from '../services/query.service';
import { contactFragment } from '../gql-query-fragments/contacts';

@Component({
  providers: [QueryService],
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactNames: IContact[];
  selectedContact: IContact;
  selectedContactId: number;
  loading = true;

  constructor(
    private queryService: QueryService
  ) { }

  ngOnInit() {
    this.getFirstIds();
    this.getAllContactNames();
    this.createContact();
  }

  getFirstIds() {
    this.queryService.query(`
      query allContacts {
        allContacts { id }
      }
    `).then(res => {
      this.getContact(res.data.allContacts[0].id);
    });
  }

  getAllContactNames() {
    this.queryService.query(`
      query allContacts {
        allContacts {
          id
          name {
            first
            last
          }
        }
      }
    `).then(res => {
      this.contactNames = res.data.allContacts;
    });
  }

  async getContact(e?) {
    this.selectedContactId = typeof e.target !== 'undefined' ? e.target.value : e;

    this.queryService.query(`
      query {
        contact(id: ${this.selectedContactId}) {
          ${contactFragment}
        }
      }
    `).then(res => {
        this.selectedContact = res.data.contact;
        this.loading = false;
      });
  }

  createContact() {
    this.queryService.mutation(`
      mutation {
        createContact(
          id: 10,
          name: {
            first: "Alan",
            last: "Eicker",
            mi: "W"
          },
          job_title: "UI Engineer",
          email: "aeick@allstate.com",
          phone: "224-567-8900",
          bio: "Bio content...",
          img_url: "http://path/to/img.jpg",
          address: {
            addr1: "345 Main street",
            addr2: null,
            addr2_type: null,
            city: "Evanston",
            state: "IL",
            zip: "60089"
          }
        ) {
          name {
            first
            last
          }
        }
      }
    `).then(res => {
      const confirmationString = `New contact created for ${res.data.createContact.name.first} ${res.data.createContact.name.last}`;
      // Show confirmation message
    });
  }

  // TODO: Update Contact
  updateContact(id: number) {

  }

  // TODO: Delete Contact
  deleteContact(id: number) {

  }

}
