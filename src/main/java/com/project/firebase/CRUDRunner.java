package com.project.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

@SpringBootApplication
public class CRUDRunner {

    public static void connectToFirebase(){

        //Connecting firebase to local project
        ClassLoader classLoader = CRUDRunner.class.getClassLoader();
        InputStream file = classLoader.getResourceAsStream("firebase/serviceAccountKey.json");
        FirebaseOptions options;
        try {
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(file))
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        FirebaseApp.initializeApp(options);
    }

    public static void main(String[] args){

        connectToFirebase();

        SpringApplication.run(CRUDRunner.class, args);
    }

}
