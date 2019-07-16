import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Datastore } from '../model/datastore';
import { Server } from '../model/server';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

    private datastoresUrl = 'http://localhost:8080/datastores';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getDatastores(): Observable<Datastore[]> {
        return this.http.get<Datastore[]>(this.datastoresUrl)
            .pipe(
                tap(_ => this.log('fetched datastores')),
                catchError(this.handleError<Datastore[]>('getDatastores', []))
            );
    }

    getDatastore(id: number): Observable<Datastore> {
        const url = `${this.datastoresUrl}/${id}`;
        return this.http.get<Datastore>(url).pipe(
            tap(_ => this.log(`fetched datastore id=${id}`)),
            catchError(this.handleError<Datastore>(`getDatastore id=${id}`))
        );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - type of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
