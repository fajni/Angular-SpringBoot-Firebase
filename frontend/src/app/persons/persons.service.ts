import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";
import { Person } from "./person/person.model";

@Injectable({
    providedIn: 'root'
})
export class PersonsService {

    private httpClient = inject(HttpClient);
    private link: string = 'http://localhost:8080';

    getLink(): string {
        return (this.link);
    }

    public getPersons(): Observable<Person[]> {
        return this.httpClient.get<Person[]>(this.link);
    }

    public getPersonByDocumentId(document_id: string): Observable<Person> {
        return this.httpClient.get<Person>(this.link + '/get/' + document_id);
    }

    public deletePerson(document_id: string): Observable<Person> {
        return this.httpClient.delete<Person>(this.link + "/delete?document_id=" + document_id);
    }

    public addPerson(person: Person): Observable<Person> {
        return this.httpClient.post<Person>(this.link + "/create", person);
    }

    public editPerson(document_id: string, newPerson: Person): Observable<Person> {
        return this.httpClient.put<Person>(this.link + "/update/" + document_id, newPerson);
    }
}