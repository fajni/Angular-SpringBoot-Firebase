import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Person } from "./person";
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getAllPersons(): Observable<Person[]> {
        return this.http.get<Person[]>(`${this.apiServerUrl}/getAll`);
    }

    public getPerson(document_id: string): Observable<Person> {
        return this.http.get<Person>(`${this.apiServerUrl}/get/${document_id}`);
    }

    public addPerson(person: Person): Observable<Person> {
        return this.http.post<Person>(`${this.apiServerUrl}/create`, person);
    }

    public updatePerson(person: Person, document_id: string): Observable<Person> {
        return this.http.put<Person>(`${this.apiServerUrl}/update?document_id=${document_id}`, person);
    }

    public deletePerson(document_id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/delete?document_id=${document_id}`);
    }
}