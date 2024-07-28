package com.project.firebase.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class PersonController {

    public final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/get") // localhost:8080/get?document_id?=1
    public ResponseEntity<Person> getPerson(@RequestParam String document_id) throws InterruptedException, ExecutionException {
        //personService.getPerson(document_id);
        return new ResponseEntity<>(personService.getPerson(document_id), HttpStatus.OK);
    }

    @GetMapping({"/","/getAll"}) // localhost:8080/, localhost:8080/getAll
    public List<Person> getAllPersons() throws InterruptedException, ExecutionException {
        return personService.getAllPersons();
    }

    @GetMapping("/get/{document_id}") //localhost:8080/get/1
    public Person getPersonByDocumentId(@PathVariable("document_id") String document_id) throws ExecutionException, InterruptedException {
        return personService.getPerson(document_id);
    }

    @DeleteMapping("/delete") //localhost:8080/delete?document_id=1
    public ResponseEntity<String> deletePerson(@RequestParam String document_id) throws InterruptedException, ExecutionException {
        return personService.deletePerson(document_id);
    }

    @PostMapping("/create") //localhost:8080/create
    public String createPerson(@RequestBody Person person) throws InterruptedException, ExecutionException {
        return personService.createPerson(person);
    }

    @PutMapping("/update") // localhost:8080/update?document_id=1
    public ResponseEntity<String> updatePerson(@RequestBody Person person, @RequestParam String document_id) throws InterruptedException, ExecutionException {
        return personService.updatePerson(person, document_id);
    }

    @PutMapping("/update/{document_id}") // localhost:8080/update/1
    public ResponseEntity<String> updatePerson2(@RequestBody Person person, @PathVariable("document_id") String document_id) throws InterruptedException, ExecutionException {
        return personService.updatePerson(person, document_id);
    }



    //Simple Test
    @GetMapping("/test")
    public ResponseEntity<String> testGetEndpoint() {
        return ResponseEntity.ok("Test Get Endpoint is Working!");
    }
}
