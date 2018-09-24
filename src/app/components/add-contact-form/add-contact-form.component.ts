import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
} from '@angular/forms';

import { IContact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss']
})
export class AddContactFormComponent implements OnInit {
  @Output() onsubmit: EventEmitter<any> = new EventEmitter();
  @Input() formData: IContact;

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    const formData = this.formData;

    this.form = new FormGroup({
      firstName: new FormControl((formData ? formData.name.first : ''), Validators.required),
      lastName: new FormControl((formData ? formData.name.last : '') || '', Validators.required),
      mi: new FormControl((formData ? formData.name.mi : '') || ''),
      email: new FormControl((formData ? formData.email : '') || '', [Validators.required, Validators.email]),
      phone: new FormControl((formData ? formData.phone : '') || '', Validators.required),
      imgUrl: new FormControl((formData ? formData.img_url : '') || '', Validators.required),
      bio: new FormControl((formData ? formData.bio : '') || '', Validators.required),
      jobTitle: new FormControl((formData ? formData.job_title : '') || '', Validators.required),
      address: new FormControl((formData ? formData.address.addr1 : '') || '', Validators.required),
      address2: new FormControl((formData ? formData.address.addr2 : '') || ''),
      address2Type: new FormControl((formData ? formData.address.addr2_type : '') || ''),
      city: new FormControl((formData ? formData.address.city : '') || '', Validators.required),
      state: new FormControl((formData ? formData.address.state : '') || '', Validators.required),
      zip: new FormControl((formData ? formData.address.zip : '') || '', Validators.required),
    });
  }

  onSubmit(form: NgForm) {

    if (this.formData) {
      this.form.value.isUpdate = true;
      this.form.value.id = this.formData.id;
    } else {
      this.form.value.id = Math.round(Math.random() * 1000000);
    }

    if (form.valid) {
      this.onsubmit.emit(this.form.value);
    }
  }

}
