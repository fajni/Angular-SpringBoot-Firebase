import { Component, DestroyRef, inject, input, model, signal } from '@angular/core';
import { Person } from './person.model';
import { PersonsService } from '../persons.service';
import { EditComponent } from "./edit/edit.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [EditComponent, RouterLink],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {

  public person = input.required<Person>();
  public openEditModal = signal<boolean>(false);
  public persons = model.required<Person[]>();

  private personsService = inject(PersonsService);
  private destroyRef = inject(DestroyRef);

  public onDelete(document_id: string): void {
    const subs = this.personsService.deletePerson(document_id).subscribe({
      next: (value) => {  },
      error: (error) => { alert(error.message); },
      complete: () => {
        console.log('Deleted person with ' + document_id + ' id!');

        const subs2 =this.personsService.getPersons().subscribe({
          next: (values) => {
            for (let i = 0; i < values.length; i++)
              if (values.at(i) === null) {
                values.pop();
              }
            this.persons.set(values);
          },
          error: (error) => console.log(error.message),
          complete: () => { }
        });
        this.destroyRef.onDestroy(() => {subs2.unsubscribe()});

      }
    });

    this.destroyRef.onDestroy(() => {
      subs.unsubscribe();
    });
  }

  public onEdit(): void {
    this.openEditModal.set(true);
  }
}
