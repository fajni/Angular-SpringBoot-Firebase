import { Component, DestroyRef, inject, input, model, OnInit, signal } from '@angular/core';
import { Person } from '../person.model';
import { PersonsService } from '../../persons.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  public editPerson = input.required<Person>();
  public openEditModal = model.required<boolean>();

  private person!: Person;
  private personsService = inject(PersonsService);
  private destoryRef = inject(DestroyRef);
  
  public editForm = new FormGroup({
    name: new FormControl('', { validators: [] }),
    lastname: new FormControl('', { validators: [] }),
    profession: new FormControl('', { validators: [] }),
    imageUrl: new FormControl('', { validators: [] }),
  });

  // set fields for form
  ngOnInit(): void {
    this.editForm.controls.name.setValue(this.editPerson().name);
    this.editForm.controls.lastname.setValue(this.editPerson().lastname);
    this.editForm.controls.profession.setValue(this.editPerson().profession);
    this.editForm.controls.imageUrl.setValue(this.editPerson().imageUrl);
  }

  onCloseModal() {
    this.openEditModal.set(false);
  }

  private printFormValues() {
    console.log('Name: ' + this.editForm.controls.name.value);
    console.log('Lastname: ' + this.editForm.controls.lastname.value);
    console.log('Profession: ' + this.editForm.controls.profession.value);
    console.log('Image URL: ' + this.editForm.controls.imageUrl.value);
  }

  private createNewPerson(): Person {
    return new Person(
      this.editPerson().document_id,
      this.editForm.controls.name.value!,
      this.editForm.controls.lastname.value!,
      this.editForm.controls.profession.value!,
      this.editForm.controls.imageUrl.value!
    );
  }

  onSubmit() {
    this.printFormValues();

    this.person = this.createNewPerson();
    console.log('Updated person: ' + this.person.toString());

    const subscription = this.personsService.editPerson(this.editPerson().document_id, this.person).subscribe({
      error: (error) => { console.log(error.message); },
      complete: () => {
        console.log('Updated person ' + this.person.document_id);
        window.location.reload();
      }
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    this.openEditModal.set(false);
  }

}
