import { Component, OnInit, Input } from '@angular/core';

import { IContact } from '../../interfaces/contact.interface';
import { QueryService } from '../../services/query.service';
import { contactFragment } from '../../gql-query-fragments/contacts';

@Component({
  providers: [QueryService],
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  allContacts: IContact[];
  selectedContact: IContact;
  selectedContactId: number;
  confirmationString: string;
  showToast = false;
  loading = true;
  showAddContactModal = false;

  @Input() title: string;

  constructor(
    private queryService: QueryService
  ) { }

  ngOnInit() {
    this.getFirstIds();
    this.getAllContactImgUrls();
  }

  closeAddContactModal() {
    this.showAddContactModal = false;
  }

  openAddContactModal() {
    this.showAddContactModal = true;
  }

  submitAddContactForm() {
    this.showAddContactModal = false;
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

  getAllContactImgUrls() {
    this.queryService.query(`
      query allContacts {
        allContacts {
          id
          img_url
          name {
            first
            last
          }
        }
      }
    `).then(res => {
      this.allContacts = res.data.allContacts;
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

  createContact(formData) {
    this.queryService.mutation(`
      mutation {
        createContact(
          id: ${Math.round(Math.random() * 1000000)},
          name: {
            first: "${formData.firstName}",
            last: "${formData.lastName}",
            mi: "${formData.mi}"
          },
          job_title: "${formData.jobTitle}",
          email: "${formData.email}",
          phone: "${formData.phone}",
          bio: "${formData.bio}",
          img_url: "${formData.imgUrl}",
          address: {
            addr1: "${formData.address}",
            addr2: "${formData.address2}",
            addr2_type: "${formData.address2Type}",
            city: "${formData.city}",
            state: "${formData.state}",
            zip: "${formData.zip}"
          }
        ) {
          id
          img_url
          name {
            first
            last
          }
        }
      }
    `).then(res => {
      this.allContacts.push(res.data.createContact);
      this.getContact(res.data.createContact.id);
      this.showAddContactModal = false;
      this.confirmationString = `New contact created for <b>${res.data.createContact.name.first} ${res.data.createContact.name.last}</b>`;
    });
  }

  // TODO: Update Contact
  updateContact(id: number) {

  }

  // TODO: Delete Contact
  deleteContact(id: number) {

  }

}
