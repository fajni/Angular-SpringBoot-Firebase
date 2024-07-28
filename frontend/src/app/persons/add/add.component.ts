import { Component, DestroyRef, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonsService } from '../persons.service';
import { Person } from '../person/person.model';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  public isAdding = model.required<boolean>();

  private personsService = inject(PersonsService);
  private destroyRef = inject(DestroyRef);

  public form = new FormGroup({
    name: new FormControl('', { validators: [] }),
    lastname: new FormControl('', { validators: [] }),
    profession: new FormControl('', { validators: [] }),
    imageUrl: new FormControl('', { validators: [] }),
  });

  public onClose() {
    this.isAdding.set(false);
  }

  private printFormValues() {
    console.log('Name: ' + this.form.controls.name.value);
    console.log('Lastname: ' + this.form.controls.lastname.value);
    console.log('Profession: ' + this.form.controls.profession.value);
    console.log('Image URL: ' + this.form.controls.imageUrl.value);
  }

  private createNewPerson(): Person {

    return new Person(
      Math.random().toString(),
      this.form.controls.name.value!,
      this.form.controls.lastname.value!,
      this.form.controls.profession.value!,
      this.form.controls.imageUrl.value!
    );

  }

  public onSubmit() {

    const newPerson = this.createNewPerson();
    const subscription = this.personsService.addPerson(newPerson).subscribe({
      complete: () => { 
        console.log('Added person: '+newPerson.toString())
        this.personsService.getPersons().subscribe();
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    this.isAdding.set(false);
  }

}
