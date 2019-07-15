import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Server} from '../model/server';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from './message.service';
import { MiddlewareInstance } from '../model/middleware';
import { ArtifactInstance } from '../model/artifact';
import { DatastoreInstance } from '../model/datastore';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ServerService {
    private serversUrl = 'http://localhost:8080/servers';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getServers(): Observable<Server[]> {
        return this.http.get<Server[]>(this.serversUrl)
            .pipe(
                tap(_ => this.log('fetched servers')),
                catchError(this.handleError<Server[]>('getServers', []))
            );
    }

    getMiddlewares(id: number): Observable<MiddlewareInstance[]> {
        const url = `${this.serversUrl}/${id}/middlewares`;
        return this.http.get<MiddlewareInstance[]>(url)
                .pipe(tap(_ => this.log('fetched middleware instance')),
                catchError(this.handleError<MiddlewareInstance[]>('getMiddlewares', []))
            );
    }

    getArtifacts(id: number): Observable<ArtifactInstance[]> {
        const url = `${this.serversUrl}/${id}/artifacts`;
        return this.http.get<ArtifactInstance[]>(url)
            .pipe(
                tap(_ => this.log('fetched artifact instance')),
                catchError(this.handleError<ArtifactInstance[]>('getArtifacts', []))
            );
    }

    getDatastores(id: number): Observable<DatastoreInstance[]> {
        const url = `${this.serversUrl}/${id}/datastores`;
        return this.http.get<DatastoreInstance[]>(url)
            .pipe(
                tap(_ => this.log('fetched datastore instance')),
                catchError(this.handleError<DatastoreInstance[]>('getDatastores', []))
            );
    }

    getServer(id: number): Observable<Server> {
        const url = `${this.serversUrl}/${id}`;
        return this.http.get<Server>(url).pipe(
            tap(_ => this.log(`fetched server id=${id}`)),
            catchError(this.handleError<Server>(`getServer id=${id}`))
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
