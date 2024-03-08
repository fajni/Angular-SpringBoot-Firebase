import { Component, OnInit } from '@angular/core';
import { Person } from './person/person';
import { PersonService } from './person/person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Frontend-Persons';

  constructor(private personService: PersonService) { }

  // every time we use app.component.ts method ngOnInit() will execute
  ngOnInit(): void {
    this.getPersons();
  }

  public persons: Person[] = [];
  public editPerson?: Person;
  public deletePerson?: Person;

  public getPersons(): void {
    this.personService.getAllPersons().subscribe( //subscribe = get notify when data is send from backend
      (response: Person[]) => {
        this.persons = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddPerson(addForm: NgForm): void {

    document.getElementById('add-person-form-close')?.click();

    this.personService.addPerson(addForm.value).subscribe(
      (response: Person) => {
        console.log(response);
        this.getPersons();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        addForm.reset();
        location.reload();
      }
    );
  }

  public onUpdatePerson(person: Person, document_id: string): void {

    this.personService.updatePerson(person, document_id).subscribe(
      (response: Person) => {
        console.log(response);
        this.getPersons();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(person);
      }
    );
  }

  public onDeletePerson(document_id: string): void {
    this.personService.deletePerson(document_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getPersons();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        location.reload();
      }
    );
  }

  public searchPersons(key: string): void {

    const results: Person[] = [];

    for(const person of this.persons) {
      if (person.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person.lastname.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person.profession.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(person);
      }
    }
    this.persons = results;

    if (results.length === 0 || !key) {
      this.getPersons();
    }
  }

  public onOpenModal(person?: Person, mode?: string): void {

    const container = document.getElementById('main-container');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonModal');
    }

    if (mode === 'edit') {
      this.editPerson = person;
      button.setAttribute('data-target', '#updatePersonModal');
    }

    if (mode === 'delete') {
      this.deletePerson = person;
      button.setAttribute('data-target', '#deletePersonModal');
    }

    container?.appendChild(button);
    button.click();
  }
}