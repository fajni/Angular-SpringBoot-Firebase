import { Component, OnInit } from '@angular/core';
import { Person } from './person/person';
import { PersonService } from './person/person.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Frontend-Person';

  constructor(private personService: PersonService) { }

  // every time we use app.component.ts method ngOnInit() will execute
  ngOnInit(): void {
      this.getPersons();
  }

  public persons: Person[] = [];

  public getPersons(): void {
    this.personService.getAllPersons().subscribe( //subscribe = get notify when data is send from backend
      (response: Person[]) => {
        this.persons = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

}
