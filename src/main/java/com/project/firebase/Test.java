package com.project.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseOptions;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

public class Test {
    public static void main(String[] args) {
        System.out.println("Test");

        ClassLoader classLoader = CRUDRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("firebase/serviceAccountKey.json")).getFile());
        System.out.println(file.getPath());
    }
}
