import { Component, DestroyRef, inject, model, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonsService } from '../persons.service';
import { Person } from '../person/person.model';
import { tap, timeout } from 'rxjs';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit{

  public isAdding = model.required<boolean>();
  public persons = model.required<Person[]>();
  public newPerson!: Person;
  public nextId!: number;

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

  private createNewPerson(): Person {

    return new Person(
      this.nextId.toString(),
      this.form.controls.name.value!,
      this.form.controls.lastname.value!,
      this.form.controls.profession.value!,
      this.form.controls.imageUrl.value!,
      this.form.controls.description.value!
    );

  }

  public onSubmit() {

    this.newPerson = this.createNewPerson();
    console.log(this.newPerson.toString());

    /* 
        This subscription doesn't work how intended.
        It will add a new person, but it won't execute any function (next, error, complete).

        Errors: 
          1. In 'Network' developer tools, 'create' is with status: '(canceled)'...
          2. From backend: IF A PERSON WITH NAME & LASTNAME ALREADY EXIST, IT WON'T BE SAVED BUT THERE'S NO INFO FROM FRONTEND
    */
    const subscription = this.personsService.addPerson(this.newPerson).subscribe({
      next: (value) => {
        console.log(value.toString());
        // this.persons().push(this.newPerson);
      },
      error: (error) => { console.log(error.message) },
      complete: () => {
        console.log('Added person: ' + this.newPerson.toString());
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    this.persons().push(this.newPerson);
    
    this.form.reset();
    this.isAdding.set(false);
  }

  public setNextId() {

    const subscription = this.personsService.getPersons().subscribe({
      next: (values) => { 
        this.nextId = values.length + 1;
      }
    });
    this.destroyRef.onDestroy(() => {subscription.unsubscribe()});
  }

  ngOnInit(): void {
      this.setNextId();
  }

}
