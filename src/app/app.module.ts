import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactListMenuComponent } from './components/contact-list-menu/contact-list-menu.component';
import { ContactListDetailComponent } from './components/contact-list-detail/contact-list-detail.component';
import { SearchComponent } from './components/search/search.component';

import { FullNamePipe } from './pipes/fullname.pipe';
import { AddressPipe } from './pipes/address.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ToastComponent,
    ToasterComponent,
    AddContactFormComponent,
    ModalComponent,
    HeaderComponent,
    ContactListMenuComponent,
    ContactListDetailComponent,
    SearchComponent,
    FullNamePipe,
    AddressPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
  ) {
    const graphqlURL = location.port !== '4200'
      ? 'https://graphql-contact-list.herokuapp.com'
      : 'http://localhost:4000';

    apollo.create({
      link: httpLink.create({ uri: `${graphqlURL}/graphql`}),
      cache: new InMemoryCache(),
    });
  }
}
