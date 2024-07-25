import { Component, inject } from '@angular/core';
import { PersonsService } from '../persons/persons.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private personService = inject(PersonsService);

  public onAddPerson(){
    this.personService.addPerson();
  }
}
