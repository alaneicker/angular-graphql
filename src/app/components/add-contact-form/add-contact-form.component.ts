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
    if (form.valid) {
      this.onsubmit.emit(this.form.value);
    }
  }

}
