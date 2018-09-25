import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchStr: string;

  constructor() { }

  ngOnInit() {
  }

  submit() {
    const values = this.searchStr.split(' ');

    // TODO: send values to search service to handle request
  }

}
