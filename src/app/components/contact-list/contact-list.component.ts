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

  createContact() {
    this.queryService.mutation(`
      mutation {
        createContact(
          id: 10,
          name: {
            first: "Fred",
            last: "Flintstone",
            mi: "J"
          },
          job_title: "Rock Quarry Forman",
          email: "fflintstone@allstate.com",
          phone: "760-345-9945",
          bio: "Internet scholar. Travelaholic. Analyst. Certified music fan. Professional pop culture expert. Unapologetic explorer. Bacon lover.",
          img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTKV_6DBw6w9r3BDGrT3luUm88FK0uYgRXcIqtp4zLxbhemt8k",
          address: {
            addr1: "773 Sandstone Drive",
            addr2: null,
            addr2_type: null,
            city: "Bedrock",
            state: "Pangea",
            zip: "99999"
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
