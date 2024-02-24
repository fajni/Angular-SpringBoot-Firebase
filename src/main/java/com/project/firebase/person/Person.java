package com.project.firebase.person;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Person {

    private String document_id;
    private String name;
    private String lastname;
    private String profession;

    @Override
    public String toString() {
        return "Name: " + name + ", Lastname: " + lastname + ", Profession: " + profession;
    }

}
