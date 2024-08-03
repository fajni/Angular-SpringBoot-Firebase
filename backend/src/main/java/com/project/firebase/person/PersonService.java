package com.project.firebase.person;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

@Service
public class PersonService {

    private final Firestore dbFirestore = FirestoreClient.getFirestore(); // connect to firebase client

    public int getNumberOfDocumentsIds() {
        int number = 0;

        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReferences = dbFirestore.collection("crud_person").listDocuments();

        for (DocumentReference myDocument : documentReferences) {
            // Get id of every document
            number++;
        }
        return number;
    }

    public boolean checkIfPersonExist(Person person) throws ExecutionException, InterruptedException {

        Iterable<DocumentReference> documentReferences = dbFirestore.collection("crud_person").listDocuments();

        for (DocumentReference myDocument : documentReferences) {
            ApiFuture<DocumentSnapshot> future = myDocument.get();
            DocumentSnapshot p = future.get();
            if (p.get("name").equals(person.getName()) && p.get("lastname").equals(person.getLastname())) {
                return false;
            }
        }

        return true;
    }

    public Person getPerson(String document_id) throws InterruptedException, ExecutionException {

        DocumentReference documentReference = dbFirestore.collection("crud_person").document(document_id); // get the document/person from firebase
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        Person person;
        if (document.exists()) {
            person = document.toObject(Person.class);
            return person;
        }

        return null;
    }

    public ArrayList<Person> getAllPersons() throws ExecutionException, InterruptedException {

        Iterable<DocumentReference> documentReferences = dbFirestore.collection("crud_person").listDocuments();

        ArrayList<Person> persons = new ArrayList<>();

        for (DocumentReference myDocument : documentReferences) {
            ApiFuture<DocumentSnapshot> future = myDocument.get();
            DocumentSnapshot person = future.get();
            persons.add(person.toObject(Person.class));
        }

        return persons;
    }

    public ResponseEntity<String> deletePerson(String document_id) throws ExecutionException, InterruptedException {

        if (getPerson(document_id) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Person with " + document_id + " id not found\"}");
        }

        ApiFuture<WriteResult> writeResult = dbFirestore.collection("crud_person").document(document_id).delete();

        //return "Successfully deleted " + document_id;
        return ResponseEntity.ok("{\"message\": \"Person with "+document_id+" id DELETED successfully\"}");
    }

    public ResponseEntity<String> createPerson(Person person) throws ExecutionException, InterruptedException {

        if (!checkIfPersonExist(person)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Person with "+person.getName() + " "+ person.getLastname()+ " already exist!\"}");
            //return "Person " + person.getName() + " " + person.getLastname() + " already exist!";
        }

        Firestore dbFirestore = FirestoreClient.getFirestore();

        person.setDocument_id(String.valueOf(getNumberOfDocumentsIds() + 1));

        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("crud_person").document(String.valueOf(getNumberOfDocumentsIds() + 1)).set(person);
        //ApiFuture<DocumentReference> collectionsApiFuture = dbFirestore.collection("crud_person").add(person);

        return ResponseEntity.ok("{\"message\": \"Person with "+person.getDocument_id()+" id ADDED successfully\"}");
//        try {
//            return "Added new person - " + person.toString() + "\n" + collectionsApiFuture.get().getUpdateTime().toString();
//            //return collectionsApiFuture.get().toString();
//        } catch (InterruptedException | ExecutionException e) {
//            throw new RuntimeException(e);
//        }
    }

    public ResponseEntity<String> updatePerson(Person person, String document_id) throws ExecutionException, InterruptedException {

        DocumentReference documentReference = dbFirestore.collection("crud_person").document(document_id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        if (!document.exists())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Person with " + document_id + " id doesn't exist\"}");

        person.setDocument_id(document_id);
        documentReference.set(person);

        return ResponseEntity.ok("{\"message\": \"Person with "+document_id+" id UPDATED successfully\"}");
    }

}
