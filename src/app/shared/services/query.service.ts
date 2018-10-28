import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QueryService {

    constructor(private apollo: Apollo) {}

    query(q): Promise<any> {
        return this.apollo.query({
            query: gql`${q}`
        })
        .toPromise()
        .then(this.handleSuccess)
        .catch(this.handleError);
    }

    mutation(q): Promise<any> {
        return this.apollo.mutate({
            mutation: gql`${q}`
        })
        .toPromise()
        .then(this.handleSuccess)
        .catch(this.handleError);
    }

    private handleSuccess(res: any) {
        return res || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred:', error);
        return Promise.reject(error.message || error);
    }

}
