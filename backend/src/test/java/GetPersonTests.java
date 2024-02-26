import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.project.firebase.CRUDRunner;
import com.project.firebase.person.Person;
import com.project.firebase.person.PersonService;
import org.junit.jupiter.api.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.*;

public class GetPersonTests {

    public PersonService personService;
    public static ClassLoader classLoader;
    public static InputStream file;
    public static FirebaseOptions options;

    ArrayList<Person> persons;

    public String newPerson = "Name: Veljko, Lastname: Fajnisevic, Profession: Student";

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

    @Test
    public void constructorTest() {
        assertNotNull(personService);
    }

    @Test
    public void getSingleTest1() throws ExecutionException, InterruptedException {
        Person person = personService.getPerson("1");
        assertNotNull(person);
    }

    @Test
    public void getSingleTest2() throws ExecutionException, InterruptedException {
        Person person = personService.getPerson("1");
        assertEquals(person.toString(), newPerson);
    }

    @Test
    public void getAllTest1() throws ExecutionException, InterruptedException {
        persons = new ArrayList<>();

        persons = personService.getAllPersons();

        assertTrue(persons.size() > 0);
    }

    @Test
    public void getAllTest2() throws ExecutionException, InterruptedException {
        persons = new ArrayList<>();

        persons.addAll(personService.getAllPersons());

        assertEquals(persons.get(0).toString(), personService.getPerson("1").toString());
    }

    @AfterEach
    public void destroy() {
        personService = null;
        classLoader = null;
        file = null;
        options = null;
        persons = null;
    }
}
