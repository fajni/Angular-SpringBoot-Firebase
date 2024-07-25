import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PersonComponent } from "./person/person.component";
import { PersonsService } from './persons.service';
import { Person } from './person/person.model';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [PersonComponent],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css'
})
export class PersonsComponent implements OnInit{
  
  private personsService = inject(PersonsService);
  private destroyRef = inject(DestroyRef);
  
  public persons = signal<Person[]>([]);

  public getPersons(){
    const subscription = this.personsService.getPersons().subscribe({
      next: (value) => {
        console.log(value);
        this.persons.set(value);
      },
      error: () => {console.log("Error occurred!")},
      complete: () => {console.log("Getting data finished!")}
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }


  ngOnInit(): void {
    this.getPersons();
  }

}
