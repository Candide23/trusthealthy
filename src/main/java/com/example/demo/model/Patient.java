package com.example.demo.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String lastName;
    private String firstName;
    private int age;

    // A patient can have a list of clinical data
    // Fecth= So when the patient is fetched automatically his clinical daya will
    //not be fetched right way. Only when it is uded in the application then it will be
    // fetched. FetchType.EAGER= everything will be loaded at once.
    @OneToMany(cascade= CascadeType.ALL,fetch= FetchType.EAGER,mappedBy = "patient")
    private List<ClinicalData> clinicalData;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}


