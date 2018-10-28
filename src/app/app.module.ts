import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactListMenuComponent } from './components/contact-list-menu/contact-list-menu.component';
import { ContactListDetailComponent } from './components/contact-list-detail/contact-list-detail.component';

import { FullNamePipe } from './pipes/fullname.pipe';
import { AddressPipe } from './pipes/address.pipe';

import { QueryService } from './shared/services/query.service';

import { SearchModule } from './components/search/search.module';
import { AddContactFormModule } from './components/add-contact-form/add-contact-form.module';

import { environment as env } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    SearchModule,
    AddContactFormModule,
  ],
  declarations: [
    AppComponent,
    ContactListComponent,
    ToastComponent,
    ToasterComponent,
    ModalComponent,
    HeaderComponent,
    ContactListMenuComponent,
    ContactListDetailComponent,
    FullNamePipe,
    AddressPipe,
  ],
  providers: [QueryService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
  ) {
    const graphqlURL = env.APIEndpint;

    apollo.create({
      link: httpLink.create({ uri: `${graphqlURL}/graphql`}),
      cache: new InMemoryCache(),
    });
  }
}
