import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

    public deletePerson(person: Person) {
        console.log(this.link + "/delete/?document_id=" + parseInt(person.document_id));
        return this.httpClient.delete(this.link + "/delete?document_id=" + person.document_id);
    }

    public addPerson() {
        //TODO!
        console.log('Adding new Person!');
    }

    public editPerson(document_id: string, newPerson: Person): Observable<Person> {
        const body = {
            name: newPerson.name,
            lastname: newPerson.lastname,
            profession: newPerson.profession,
            imageUrl: newPerson.imageUrl
        };
        console.log(body);
        return this.httpClient.put<Person>(this.link + "/update/" + document_id, body);
    }
}