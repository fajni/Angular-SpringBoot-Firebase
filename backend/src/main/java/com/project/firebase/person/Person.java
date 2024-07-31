package com.project.firebase.person;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Person {

    private String document_id;
    private String name;
    private String lastname;
    private String profession;
    private String imageUrl;
    private String description;

    public Person(String name, String lastname, String profession, String description) {
        super();
        this.name = name;
        this.lastname = lastname;
        this.profession = profession;
        this.imageUrl = null;
        this.description = description;
    }

    @Override
    public String toString() {
        return "Name: " + name + ", Lastname: " + lastname + ", Profession: " + profession + ", Description: " + description;
    }

}
