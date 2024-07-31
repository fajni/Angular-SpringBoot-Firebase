import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.project.firebase.CRUDRunner;
import com.project.firebase.person.Person;
import com.project.firebase.person.PersonService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DeletePersonTests {

    public PersonService personService;
    public static ClassLoader classLoader;
    public static InputStream file;
    public static FirebaseOptions options;

    public static void connectToFirebase() {
        classLoader = CRUDRunner.class.getClassLoader();
        file = classLoader.getResourceAsStream("firebase/serviceAccountKey.json");
        try {
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(file))
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        FirebaseApp.initializeApp(options);
    }

    @BeforeAll
    public static void setUpConnection() {
        connectToFirebase();
    }

    @BeforeEach
    public void setUp() {
        personService = new PersonService();
    }

    @AfterEach
    public void destroy() {
        personService = null;
        classLoader = null;
        file = null;
        options = null;
    }

    @Test
    public void deletePersonTest1() throws ExecutionException, InterruptedException {
        Person person = new Person("Test Name", "Test Lastname", "Test Profession", "Test Description");
        personService.createPerson(person);

        assertEquals(personService.deletePerson("2"), ResponseEntity.ok("{\"message\": \"Person with 2 id DELETED successfully\"}"));
    }

    @Test
    public void deletePersonTest2() throws ExecutionException, InterruptedException{
        assertEquals(personService.deletePerson("200"), ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Person with 200 id not found\"}"));
    }
}
