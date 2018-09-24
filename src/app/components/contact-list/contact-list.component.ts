import { Component, OnInit, Input } from '@angular/core';

import { IContact } from '../../interfaces/contact.interface';
import { QueryService } from '../../services/query.service';
import { contactFragment, contactsMenuFragment } from '../../gql-query-fragments/contacts';

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
  menuIsOpen = false;
  itemToUpdate = null;

  @Input() title: string;

  constructor(
    private queryService: QueryService
  ) { }

  ngOnInit() {
    this.getFirstContact();
    this.getAllContactImgUrls();
  }

  closeAddContactModal() {
    this.showAddContactModal = false;
    this.itemToUpdate = null;
  }

  openAddContactModal() {
    this.showAddContactModal = true;
  }

  submitAddContactForm() {
    this.showAddContactModal = false;
  }

  toggleMenu() {
    this.menuIsOpen = this.menuIsOpen ? false : true;
  }

  getFirstContact() {
    this.queryService.query(`
      query getFirstContact {
        getFirstContact {
          ${contactFragment}
        }
      }
    `).then(res => {
      this.selectedContact = res.data.getFirstContact[0];
    });
  }

  getAllContactImgUrls() {
    this.queryService.query(`
      query allContacts {
        allContacts {
          ${contactsMenuFragment}
        }
      }
    `).then(res => {
      this.allContacts = res.data.allContacts;
    });
  }

  getContact(e?: any) {
    this.selectedContactId = typeof e.target !== 'undefined' ? e.target.value : e;
    this.menuIsOpen = false;

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

  createContact(formData: any) {
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
          ${contactsMenuFragment}
        }
      }
    `).then(res => {
      this.allContacts.push(res.data.createContact);
      this.getContact(res.data.createContact.id);
      this.showAddContactModal = false;
      this.confirmationString = `New contact created for <b>${res.data.createContact.name.first} ${res.data.createContact.name.last}</b>`;
    });
  }

  updateContact(contact: IContact) {
    this.itemToUpdate = contact;
    this.openAddContactModal();
  }

  deleteContact(id: number) {
    const itemIndex = this.allContacts.findIndex(item => item.id === id);
    const prevItemId = this.allContacts[itemIndex - 1].id;

    this.queryService.mutation(`
      mutation {
        deleteContact(id: ${id}) {
          id
        }
      }
    `).then(res => {
      this.allContacts.splice(itemIndex, 1);
      this.getContact(prevItemId);
    });
  }

}
