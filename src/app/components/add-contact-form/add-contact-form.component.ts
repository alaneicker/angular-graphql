import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from '../../interfaces/contact.interface';
import { QueryService } from '../../services/query.service';
import { contactFragment } from '../../gql-query-fragments/contacts';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss']
})
export class AddContactFormComponent implements OnInit {
  @Input() onSubmitEvent: boolean;
  @Output() onsubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private queryService: QueryService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.onsubmit.emit();
  }

}
