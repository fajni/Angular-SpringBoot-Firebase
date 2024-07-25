import { Component, DestroyRef, inject, input, model, signal } from '@angular/core';
import { Person } from '../person.model';
import { PersonsService } from '../../persons.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  public editPerson = input.required<Person>();
  public openEditModal = model.required<boolean>();

  private personsService = inject(PersonsService);
  private destoryRef = inject(DestroyRef);

  public enteredName = '';
  public enteredLastname = '';
  public enteredProfession = '';
  public enteredImageUrl = '';

  onCloseModal() {
    this.openEditModal.set(false);
  }

  onSaveModal(document_id: string, newName: string, newLastname: string, newProfession: string, newImageUrl: string) {

    const newPerson = new Person(document_id, newName, newLastname, newProfession, newImageUrl);
    console.log(newPerson.toString());

    const subscription = this.personsService.editPerson(document_id, newPerson).subscribe({
      error: (error) => { alert(error.message); },
      complete: () => {
        console.log('Updated person with ' + document_id + ' id!');
        // window.location.reload();
      }
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    this.openEditModal.set(false);
  }
}
