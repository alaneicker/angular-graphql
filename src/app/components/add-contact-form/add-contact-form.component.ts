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

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss']
})
export class AddContactFormComponent implements OnInit {
  @Output() onsubmit: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mi: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      imgUrl: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      address2: new FormControl(''),
      address2Type: new FormControl(''),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
    });
  }

  onSubmit(form: NgForm) {

    const createContactFragment = `
      id: 10,
      name: {
        first: "${this.form.get('firstName').value}",
        last: "${this.form.get('lastName').value}",
        mi: "${this.form.get('mi').value}"
      },
      job_title: "${this.form.get('jobTitle').value}",
      email: "${this.form.get('email').value}",
      phone: "${this.form.get('phone').value}",
      bio: "${this.form.get('bio').value}",
      img_url: "${this.form.get('imgUrl').value}",
      address: {
        addr1: "${this.form.get('address').value}",
        addr2: "${this.form.get('address2').value}",
        addr2_type: "${this.form.get('address2Type').value}",
        city: "${this.form.get('city').value}",
        state: "${this.form.get('state').value}",
        zip: "${this.form.get('zip').value}"
      }
    `;

    // this.onsubmit.emit();
  }

}
