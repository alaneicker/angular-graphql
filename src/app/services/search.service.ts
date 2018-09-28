import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchService {
    public search = new BehaviorSubject<any>({
        query: null,
    });

    watch = this.search.asObservable();

    query(query: string) {
        this.search.next({
            query,
        });
    }

    getSearchResults() {
        return this.search.getValue().query;
    }

}
