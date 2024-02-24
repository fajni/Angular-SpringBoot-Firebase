package com.project.firebase.person;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class PersonController {

    public PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/get")
    public Person getPerson(@RequestParam String document_id) throws InterruptedException, ExecutionException {
        return personService.getPerson(document_id);
    }

    @GetMapping("/getAll")
    public List<Person> getAllPersons() throws InterruptedException, ExecutionException {
        return personService.getAllPersons();
    }

    @DeleteMapping("/delete")
    public String deletePerson(@RequestParam String document_id) throws InterruptedException, ExecutionException {
        return personService.deletePerson(document_id);
    }

    @PostMapping("/create")
    public String createPerson(@RequestBody Person person) throws InterruptedException, ExecutionException {
        return personService.createPerson(person);
    }

    @PutMapping("/update")
    public String updatePerson(@RequestBody Person person, @RequestParam String document_id) throws InterruptedException, ExecutionException {
        return personService.updatePerson(person, document_id);
    }

    //Simple Test
    @GetMapping("/test")
    public ResponseEntity<String> testGetEndpoint() {
        return ResponseEntity.ok("Test Get Endpoint is Working!");
    }
}
