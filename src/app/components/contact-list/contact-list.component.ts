import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { IContact } from '../../interfaces/contact.interface';
import { QueryService } from '../../services/query.service';
import { SearchService } from '../../services/search.service';

import { contactFragment, contactsMenuFragment } from '../../gql-query-fragments/contacts';

@Component({
  providers: [QueryService, SearchService],
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

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
    private queryService: QueryService,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.getFirstContact();
    this.getAllContactImgUrls();
    this.searchObserver();
  }

  searchObserver() {
    this.searchService.watch
      .takeUntil(this.unsubscribe$)
      .subscribe(res => {
        if (res.query) {
          this.queryService.query(`
            query {
              contactByName(${res.query}) {
                ${contactFragment}
              }
            }
          `).then((resp) => {
              const contact = <IContact>resp.data.contactByName;

              if (contact.id) {
                this.selectedContact = contact;
                this.selectedContactId = contact.id;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
      query firstContact {
        firstContact {
          ${contactFragment}
        }
      }
    `).then((res) => {
        this.selectedContact = <IContact>res.data.firstContact[0];
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
        this.allContacts = <IContact[]>res.data.allContacts;
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
        this.selectedContact = <IContact>res.data.contact;
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
          this.allContacts.push(<IContact>res.data.createContact);
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
