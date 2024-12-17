import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.project.firebase.CRUDRunner;
import com.project.firebase.person.model.Person;
import com.project.firebase.person.service.PersonService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CreatePersonTests {

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
    public void createPersonTest1() throws ExecutionException, InterruptedException {
        Person person = new Person("Test Name", "Test Lastname", "Test Profession", "Test Description");
        personService.createPerson(person);

        assertEquals(person.toString(), personService.getPerson("2").toString());
        personService.deletePerson("2");
    }

    @Test
    public void createPersonTest2() throws ExecutionException, InterruptedException {
        Person person1 = new Person("Test Name", "Test Lastname", "Test Profession", "Test Description");
        Person person2 = new Person("Test Name", "Test Lastname", "Test Profession", "Test Description");

        personService.createPerson(person1);

        assertEquals(personService.createPerson(person2), "Person Test Name Test Lastname already exist!");
        personService.deletePerson("2");
    }

}
