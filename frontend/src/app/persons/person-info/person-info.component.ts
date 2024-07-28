import { Component, computed, DestroyRef, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Person } from '../person/person.model';
import { PersonsService } from '../persons.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-person-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './person-info.component.html',
  styleUrl: './person-info.component.css'
})
export class PersonInfoComponent implements OnChanges {

  private personsService: PersonsService = inject(PersonsService);
  private destroyRef = inject(DestroyRef);

  public document_id = input.required<string>();
  public person = signal<Person | undefined>(undefined);

  onNext() {
    console.log('Next person: ');
  }

  onPrevious(){
    console.log('Previous person: ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const subscription = this.personsService.getPersonByDocumentId(this.document_id()).subscribe({
      next: (value) => {
        this.person.set(value);
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

}
