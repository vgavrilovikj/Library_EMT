package com.library.backend.models;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    @OneToOne
    private Country country;

    public Author() {
    }
}
