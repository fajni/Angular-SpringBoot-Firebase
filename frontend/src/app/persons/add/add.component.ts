import { Component, DestroyRef, inject, model } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonsService } from '../persons.service';
import { Person } from '../person/person.model';
import { catchError, retry, throwError, timeout } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  public isAdding = model.required<boolean>();
  public persons = model.required<Person[]>();
  public newPerson!: Person;

  private personsService = inject(PersonsService);
  private destroyRef = inject(DestroyRef);

  public form = new FormGroup({
    name: new FormControl('', { validators: [] }),
    lastname: new FormControl('', { validators: [] }),
    profession: new FormControl('', { validators: [] }),
    imageUrl: new FormControl('', { validators: [] }),
    description: new FormControl('', { validators: [] })
  });

  public onClose() {
    let text = "Are you sure you want to leave? You'll leave data!";
    if (confirm(text) === true) {
      this.isAdding.set(false);
    }
  }

  private printFormValues() {
    console.log('Name: ' + this.form.controls.name.value);
    console.log('Lastname: ' + this.form.controls.lastname.value);
    console.log('Profession: ' + this.form.controls.profession.value);
    console.log('Image URL: ' + this.form.controls.imageUrl.value);
    console.log('Description: ' + this.form.controls.description.value);
  }

  private createNewPerson(): Person {

    return new Person(
      Math.floor(Math.random() * (1000 - 90 + 1) + 90).toString(),
      this.form.controls.name.value!,
      this.form.controls.lastname.value!,
      this.form.controls.profession.value!,
      this.form.controls.imageUrl.value!,
      this.form.controls.description.value!
    );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
}

  public onSubmit() {

    this.newPerson = this.createNewPerson();

    const subscription = this.personsService.addPerson(this.newPerson).pipe(timeout(5000)).subscribe({
      next: (value) => {
        console.log(value.toString());
        this.persons().push(value);
      },
      error: (error) => { console.log(error.message) },
      complete: () => {
        console.log('Added person: ' + this.newPerson.toString());
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    this.form.reset();
    this.isAdding.set(false);
  }

}
