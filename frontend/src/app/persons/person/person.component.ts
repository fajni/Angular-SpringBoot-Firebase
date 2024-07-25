import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Person } from './person.model';
import { PersonsService } from '../persons.service';
import { EditComponent } from "./edit/edit.component";

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [EditComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {

  public person = input.required<Person>();

  private personsService = inject(PersonsService);
  private destroyRef = inject(DestroyRef);
  public openEditModal = signal<boolean>(false);

  public onDelete(person: Person): void {
    const subs = this.personsService.deletePerson(person).subscribe({
      error: (error) => { alert(error.message); },
      complete: () => { 
        console.log('Deleted person with ' + person.document_id + ' id!');
      }
    });
    
    this.destroyRef.onDestroy(() => {
      subs.unsubscribe();
    });
  }

  public onEdit(person: Person): void {
    this.openEditModal.set(true);
  }
}
