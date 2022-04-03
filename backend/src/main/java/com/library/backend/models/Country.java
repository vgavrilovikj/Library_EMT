package com.library.backend.models;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "countries")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String continent;

    public Country() {
    }
}
