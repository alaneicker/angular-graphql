import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchStr: string;

  constructor(
    private searchService: SearchService,
  ) { }

  ngOnInit() {
  }

  submit() {
    const values = this.searchStr.split(' ');
    let query;

    if (values.length === 3) {
      query = `
        first_name: "${values[0]}",
        last_name: "${values[2]}",
        mi: "${values[1].replace('.', '')}"
      `;
    }

    if (values.length === 2) {
      query = `
        first_name: "${values[0]}",
        last_name: "${values[1]}",
        mi: null
      `;
    }

    this.searchService.query(query);
  }

}
