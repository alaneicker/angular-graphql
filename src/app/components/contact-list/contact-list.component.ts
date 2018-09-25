import { Component, OnInit, Input } from '@angular/core';

import { IContact } from '../../interfaces/contact.interface';
import { QueryService } from '../../services/query.service';

import {
  contactFragment,
  contactsMenuFragment,
  contactNameFragment,
} from '../../gql-query-fragments/contacts';

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
      })
      .catch(err => {
        console.log(err);
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
      })
      .catch(err => {
        console.log(err);
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  saveContact(form: any) {
    const queryFragment = `
      id: ${form.id},
      name: {
        first: "${form.firstName}",
        last: "${form.lastName}",
        mi: "${form.mi || ''}"
      },
      job_title: "${form.jobTitle}",
      email: "${form.email}",
      phone: "${form.phone}",
      bio: "${form.bio}",
      img_url: "${form.imgUrl}",
      address: {
        addr1: "${form.address}",
        addr2: "${form.address2 || ''}",
        addr2_type: "${form.address2Type || ''}",
        city: "${form.city}",
        state: "${form.state}",
        zip: "${form.zip}"
      }
    `;

    if (form.isUpdate) {
      this.queryService.mutation(`
        mutation {
          updateContact(
            ${queryFragment}
          ) {
            ${contactFragment}
          }
        }
      `).then(res => {
          this.showAddContactModal = false;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.queryService.mutation(`
        mutation {
          createContact(
            ${queryFragment}
          ) {
            ${contactsMenuFragment}
          }
        }
      `).then(res => {
          this.allContacts.push(res.data.createContact);
          this.getContact(form.id);
          this.showAddContactModal = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
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
      })
      .catch(err => {
        console.log(err);
      });
  }

}
