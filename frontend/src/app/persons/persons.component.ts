import { Component, DestroyRef, inject, model, OnInit, signal } from '@angular/core';
import { PersonComponent } from "./person/person.component";
import { PersonsService } from './persons.service';
import { Person } from './person/person.model';
import { AddComponent } from "./add/add.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [PersonComponent, AddComponent, RouterOutlet],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.css'
})
export class PersonsComponent implements OnInit {

  private personsService = inject(PersonsService);
  private destroyRef = inject(DestroyRef);

  public persons = signal<Person[]>([]);
  public isAdding = signal<boolean>(false);
  public connectionToBackend: boolean = false;

  public getPersons() {
    const subscription = this.personsService.getPersons().subscribe({
      next: (values) => {
        this.persons.set(values);
        this.connectionToBackend = true;
      },
      error: () => { console.log("Error occurred!") },
      complete: () => { console.log("Getting data finished!") }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  public onAddPerson() {
    this.isAdding.set(true);
  }

  ngOnInit(): void {
    this.getPersons();
  }
}
