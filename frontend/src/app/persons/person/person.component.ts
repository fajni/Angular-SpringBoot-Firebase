import { Component, DestroyRef, inject, input, signal } from '@angular/core';
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

  private personsService = inject(PersonsService);
  private destroyRef = inject(DestroyRef);

  public onDelete(person: Person): void {
    const subs = this.personsService.deletePerson(person).subscribe({
      next: (response) => {
        console.log('Response: ' + response);
      },
      error: (error) => { alert(error.message); },
      complete: () => { 
        console.log('Deleted person with ' + person.document_id + ' id!'); 
        // window.location.reload();
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
