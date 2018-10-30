import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryService } from './services/query.service';

@NgModule({
  imports: [CommonModule],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [QueryService],
    };
  }
}
