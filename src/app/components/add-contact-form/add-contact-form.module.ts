import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddContactFormComponent } from './add-contact-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AddContactFormComponent],
  exports: [AddContactFormComponent],
})
export class AddContactFormModule { }
