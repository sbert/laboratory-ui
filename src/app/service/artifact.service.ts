import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { ArtifactInstance } from '../model/artifact';
import { catchError, tap } from 'rxjs/operators';
import { Artifact } from '../model/artifact';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

    private artifactsUrl = 'http://localhost:8080/artifacts';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getArtifacts(): Observable<ArtifactInstance[]> {
        return this.http.get<ArtifactInstance[]>(this.artifactsUrl)
            .pipe(
                tap(_ => this.log('fetched artifacts')),
                catchError(this.handleError<ArtifactInstance[]>('getArtifacts', []))
            );
    }

    getArtifact(id: number): Observable<Artifact> {
        const url = `${this.artifactsUrl}/${id}`;
        return this.http.get<Artifact>(url).pipe(
            tap(_ => this.log(`fetched artifact id=${id}`)),
            catchError(this.handleError<Artifact>(`getArtifact id=${id}`))
        );
    }


    getArtifactInstancesByArtifactIdAndEnv(id: number, env: string): Observable<ArtifactInstance[]> {
        const url = `${this.artifactsUrl}/${id}/env/${env}`;
        return this.http.get<ArtifactInstance[]>(url).pipe(
            tap(_ => this.log(`fetched artifact id=${id}`)),
            catchError(this.handleError<ArtifactInstance[]>(`getArtifactInstancesByArtifactIdAndEnv id=${id} env=${env}`))
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
