import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Middleware } from '../model/middleware';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {

    private middlewaresUrl = 'http://localhost:8080/middlewares';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getMiddlewares(): Observable<Middleware[]> {
        return this.http.get<Middleware[]>(this.middlewaresUrl)
            .pipe(
                tap(_ => this.log('fetched middlewares')),
                catchError(this.handleError<Middleware[]>('getMiddlewares', []))
            );
    }

    getMiddleware(id: number): Observable<Middleware> {
        const url = `${this.middlewaresUrl}/${id}`;
        return this.http.get<Middleware>(url).pipe(
            tap(_ => this.log(`fetched middleware id=${id}`)),
            catchError(this.handleError<Middleware>(`getMiddleware id=${id}`))
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

